import express, { type Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSubscriberSchema, 
  insertProductSchema, 
  insertCartItemSchema, 
  insertOrderSchema,
  insertOrderItemSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth, hashPassword, comparePasswords } from "./auth";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" as any })
  : null;

// Authentication middleware
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // API routes
  const apiRouter = express.Router();
  
  // Get testimonials
  apiRouter.get("/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // Subscribe to newsletter
  apiRouter.post("/subscribe", async (req: Request, res: Response) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(subscriberData.email);
      
      if (existingSubscriber) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      
      const subscriber = await storage.createSubscriber(subscriberData);
      res.status(201).json({ 
        message: "Subscription successful",
        discountCode: "MILK&HONEY10" 
      });
      
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Failed to process subscription" });
    }
  });

  // Product routes
  apiRouter.get("/products", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      let products;
      
      if (category) {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  apiRouter.get("/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  // Cart routes (requires authentication)
  apiRouter.get("/cart", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      let cart = await storage.getCart(userId);
      
      if (!cart) {
        // Create cart if it doesn't exist
        cart = await storage.createCart({ userId });
      }
      
      const cartItems = await storage.getCartItems(cart.id);
      
      // Fetch product details for each cart item
      const cartWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product
          };
        })
      );
      
      res.json({
        id: cart.id,
        items: cartWithProducts
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });
  
  apiRouter.post("/cart/items", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      let cart = await storage.getCart(userId);
      
      if (!cart) {
        // Create cart if it doesn't exist
        cart = await storage.createCart({ userId });
      }
      
      const { productId, quantity = 1 } = req.body;
      
      // Check if product exists
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Check if item already in cart
      const cartItems = await storage.getCartItems(cart.id);
      const existingItem = cartItems.find(item => item.productId === productId);
      
      if (existingItem) {
        // Update quantity if already in cart
        const updatedItem = await storage.updateCartItemQuantity(
          existingItem.id, 
          existingItem.quantity + quantity
        );
        return res.json(updatedItem);
      }
      
      // Add new item to cart
      const cartItem = await storage.addCartItem({
        cartId: cart.id,
        productId,
        quantity
      });
      
      res.status(201).json(cartItem);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });
  
  apiRouter.put("/cart/items/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(itemId, quantity);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });
  
  apiRouter.delete("/cart/items/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.id);
      const success = await storage.deleteCartItem(itemId);
      
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });
  
  // Payment intent creation for checkout
  apiRouter.post("/create-payment-intent", isAuthenticated, async (req: Request, res: Response) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe configuration is missing" });
      }
      
      const userId = req.user!.id;
      const cart = await storage.getCart(userId);
      
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      
      const cartItems = await storage.getCartItems(cart.id);
      
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      
      // Calculate total from items in cart
      let total = 0;
      for (const item of cartItems) {
        const product = await storage.getProduct(item.productId);
        if (product) {
          total += parseFloat(product.price) * item.quantity;
        }
      }
      
      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100), // Convert to cents
        currency: "ron",
        metadata: {
          userId: userId.toString(),
          cartId: cart.id.toString()
        }
      });
      
      // Return client secret
      res.json({
        clientSecret: paymentIntent.client_secret,
        amount: total
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Failed to create payment intent" });
    }
  });
  
  // Webhook for handling payment success
  apiRouter.post("/webhook", express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe configuration is missing" });
    }
    
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'] as string,
        process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test'
      );
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    // Handle specific event types
    if (event.type === 'payment_intent.succeeded') {
      try {
        const paymentIntent = event.data.object;
        const userId = parseInt(paymentIntent.metadata.userId);
        const cartId = parseInt(paymentIntent.metadata.cartId);
        
        // Create order from cart
        const cart = await storage.getCart(userId);
        if (!cart) {
          throw new Error("Cart not found");
        }
        
        const cartItems = await storage.getCartItems(cart.id);
        
        // Calculate total
        let total = 0;
        for (const item of cartItems) {
          const product = await storage.getProduct(item.productId);
          if (product) {
            total += parseFloat(product.price) * item.quantity;
          }
        }
        
        // Create order
        const order = await storage.createOrder({
          userId,
          total: total.toString(),
          shippingAddress: null,
          billingAddress: null
        });
        
        // Create order items
        for (const item of cartItems) {
          const product = await storage.getProduct(item.productId);
          if (product) {
            await storage.createOrderItem({
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: product.price
            });
          }
        }
        
        // Update order with payment intent ID
        await storage.updateOrderStatus(order.id, "paid");
        
        // Clear cart
        await storage.clearCart(cart.id);
      } catch (error) {
        console.error("Error processing payment success:", error);
      }
    }
    
    res.json({ received: true });
  });
  
  // User profile update
  apiRouter.put("/user", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, phone } = req.body;
      
      // Check if email already exists for different user
      if (email && email !== req.user!.email) {
        const existingUser = await storage.getUserByEmail(email);
        if (existingUser && existingUser.id !== req.user!.id) {
          return res.status(400).json({ message: "Email already in use by another account" });
        }
      }
      
      const updatedUser = await storage.updateUser(req.user!.id, {
        firstName,
        lastName,
        email,
        phone
      });
      
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Change user password
  apiRouter.put("/user/password", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      // Verify current password
      const isValid = await comparePasswords(currentPassword, req.user!.password);
      if (!isValid) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      
      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);
      
      // Update the password
      const updatedUser = await storage.updateUser(req.user!.id, {
        password: hashedPassword
      });
      
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  // Order routes (requires authentication)
  apiRouter.get("/orders", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const orders = await storage.getUserOrders(userId);
      
      // Get order items for each order
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const items = await storage.getOrderItems(order.id);
          return {
            ...order,
            items
          };
        })
      );
      
      res.json(ordersWithItems);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  
  apiRouter.get("/orders/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Check if order belongs to user
      if (order.userId !== req.user!.id) {
        return res.status(403).json({ message: "Unauthorized access to order" });
      }
      
      const items = await storage.getOrderItems(order.id);
      
      // Get product details for each item
      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product
          };
        })
      );
      
      res.json({
        ...order,
        items: itemsWithProducts
      });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Register API routes with /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
