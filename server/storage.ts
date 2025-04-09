import { 
  users, type User, type InsertUser,
  subscribers, type Subscriber, type InsertSubscriber,
  testimonials, type Testimonial, type InsertTestimonial,
  products, type Product, type InsertProduct,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  carts, type Cart, type InsertCart,
  cartItems, type CartItem, type InsertCartItem
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";
import session from "express-session";

export interface IStorage {
  // Session store
  sessionStore: session.Store;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User | undefined>;
  
  // Subscriber methods
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, productData: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Order methods
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Order Item methods
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  
  // Cart methods
  getCart(userId: number): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  deleteCart(id: number): Promise<boolean>;
  
  // Cart Item methods
  getCartItems(cartId: number): Promise<CartItem[]>;
  addCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  deleteCartItem(id: number): Promise<boolean>;
  clearCart(cartId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: Map<number, User>;
  private subscribers: Map<number, Subscriber>;
  private testimonials: Map<number, Testimonial>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private carts: Map<number, Cart>;
  private cartItems: Map<number, CartItem>;
  
  private currentUserId: number;
  private currentSubscriberId: number;
  private currentTestimonialId: number;
  private currentProductId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;
  private currentCartId: number;
  private currentCartItemId: number;

  constructor() {
    // Setup in-memory session store
    // Create a dummy session store since we're not using authentication with this storage right now
    this.sessionStore = new session.MemoryStore();
    
    this.users = new Map();
    this.subscribers = new Map();
    this.testimonials = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.carts = new Map();
    this.cartItems = new Map();
    
    this.currentUserId = 1;
    this.currentSubscriberId = 1;
    this.currentTestimonialId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.currentCartId = 1;
    this.currentCartItemId = 1;
    
    // Initialize with sample data
    this.initializeTestimonials();
    this.initializeProducts();
  }
  
  private initializeTestimonials() {
    const testimonialData = [
      {
        name: "Julia Roman",
        content: "Andreea a transformat visul meu in realitate. Recomand serviciile pentru orice eveniment.",
        rating: 5,
        displayOrder: 1
      },
      {
        name: "Daniela Bratu",
        content: "Apreciez deschiderea cu care Andreea lucreaza. Foarte receptiva si profesionala.",
        rating: 5,
        displayOrder: 2
      }
    ];
    
    testimonialData.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      id,
      username: insertUser.username,
      email: insertUser.email,
      password: insertUser.password,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      createdAt: now,
      phone: null,
      address: null,
      city: null,
      country: null,
      postalCode: null,
      stripeCustomerId: null
    };
    this.users.set(id, user);
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { ...user, stripeCustomerId };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  // Subscriber methods
  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }
  
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
  
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const now = new Date();
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id, 
      subscribedAt: now, 
      active: true 
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    const testimonials = Array.from(this.testimonials.values());
    return testimonials.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      displayOrder: insertTestimonial.displayOrder || 0
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  private initializeProducts() {
    const productData = [
      {
        name: "Buchet de trandafiri roz",
        description: "Un buchet elegant de trandafiri roz, perfect pentru a exprima afecțiune și admirație.",
        price: "180.00",
        imageUrl: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "buchete",
        stock: 15
      },
      {
        name: "Aranjament floral pentru masa",
        description: "Aranjament floral de sezon, perfect pentru decorarea mesei la ocazii speciale.",
        price: "250.00",
        imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "aranjamente",
        stock: 10
      },
      {
        name: "Coronita din flori de camp",
        description: "Coronita delicata din flori de camp, ideala pentru evenimente in aer liber si nunti rustice.",
        price: "120.00",
        imageUrl: "https://images.unsplash.com/photo-1533616688419-b7a585564566?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "coronite",
        stock: 8
      },
      {
        name: "Buchet de mireasa",
        description: "Buchet de mireasa elegant cu trandafiri albi si accente de verdeata, perfect pentru ziua cea mare.",
        price: "350.00",
        imageUrl: "https://images.unsplash.com/photo-1551893665-f843f600794e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "nunta",
        stock: 5
      },
      {
        name: "Aranjament floral corporate",
        description: "Aranjament floral sofisticat pentru birouri si evenimente corporate.",
        price: "280.00",
        imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "corporate",
        stock: 12
      },
      {
        name: "Cutie cu flori mixte",
        description: "Cutie eleganta cu flori sezoniere mixte, un cadou perfect pentru orice ocazie.",
        price: "220.00",
        imageUrl: "https://images.unsplash.com/photo-1521543832500-49e69fb2bea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "cutii",
        stock: 20
      }
    ];
    
    productData.forEach(product => {
      this.createProduct(product);
    });
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const now = new Date();
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: now,
      stock: insertProduct.stock || 0
    };
    this.products.set(id, product);
    return product;
  }
  
  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | undefined> {
    const product = await this.getProduct(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...productData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const now = new Date();
    const order: Order = {
      ...insertOrder,
      id,
      status: "pending",
      createdAt: now,
      paymentIntentId: null,
      shippingAddress: insertOrder.shippingAddress || null,
      billingAddress: insertOrder.billingAddress || null
    };
    this.orders.set(id, order);
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = await this.getOrder(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Order Item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (orderItem) => orderItem.orderId === orderId
    );
  }
  
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const orderItem: OrderItem = {
      ...insertOrderItem,
      id
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
  
  // Cart methods
  async getCart(userId: number): Promise<Cart | undefined> {
    return Array.from(this.carts.values()).find(
      (cart) => cart.userId === userId
    );
  }
  
  async createCart(insertCart: InsertCart): Promise<Cart> {
    const id = this.currentCartId++;
    const now = new Date();
    const cart: Cart = {
      ...insertCart,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.carts.set(id, cart);
    return cart;
  }
  
  async deleteCart(id: number): Promise<boolean> {
    return this.carts.delete(id);
  }
  
  // Cart Item methods
  async getCartItems(cartId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (cartItem) => cartItem.cartId === cartId
    );
  }
  
  async addCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    const cartItem: CartItem = {
      ...insertCartItem,
      id,
      quantity: insertCartItem.quantity || 1
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  
  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedCartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedCartItem);
    return updatedCartItem;
  }
  
  async deleteCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  async clearCart(cartId: number): Promise<boolean> {
    const cartItems = await this.getCartItems(cartId);
    let success = true;
    
    for (const item of cartItems) {
      const result = await this.deleteCartItem(item.id);
      if (!result) success = false;
    }
    
    return success;
  }
}

/* Commented out for now until PostgreSQL is properly set up
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  private pool: Pool;

  constructor() {
    // Initialize PostgreSQL connection pool
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });

    // Initialize session store
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({
      pool: this.pool,
      createTableIfMissing: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User | undefined> {
    return this.updateUser(userId, { stripeCustomerId });
  }

  // Subscriber methods
  async getSubscribers(): Promise<Subscriber[]> {
    return db.select().from(subscribers);
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return subscriber;
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db.insert(subscribers).values({
      ...insertSubscriber,
      subscribedAt: new Date(),
      active: true
    }).returning();
    return subscriber;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(asc(testimonials.displayOrder));
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values({
      ...insertTestimonial,
      displayOrder: insertTestimonial.displayOrder || 0
    }).returning();
    return testimonial;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return db.select().from(products).where(eq(products.category, category));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values({
      ...insertProduct,
      createdAt: new Date(),
      stock: insertProduct.stock || 0
    }).returning();
    return product;
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set(productData)
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning({ id: products.id });
    return result.length > 0;
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return db.select().from(orders);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return db.select().from(orders).where(eq(orders.userId, userId));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values({
      ...insertOrder,
      status: "pending",
      paymentIntentId: null,
      createdAt: new Date(),
      shippingAddress: insertOrder.shippingAddress || null,
      billingAddress: insertOrder.billingAddress || null
    }).returning();
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  // Order Item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const [orderItem] = await db.insert(orderItems).values(insertOrderItem).returning();
    return orderItem;
  }

  // Cart methods
  async getCart(userId: number): Promise<Cart | undefined> {
    const [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
    return cart;
  }

  async createCart(insertCart: InsertCart): Promise<Cart> {
    const now = new Date();
    const [cart] = await db.insert(carts).values({
      ...insertCart,
      createdAt: now,
      updatedAt: now
    }).returning();
    return cart;
  }

  async deleteCart(id: number): Promise<boolean> {
    const result = await db
      .delete(carts)
      .where(eq(carts.id, id))
      .returning({ id: carts.id });
    return result.length > 0;
  }

  // Cart Item methods
  async getCartItems(cartId: number): Promise<CartItem[]> {
    return db.select().from(cartItems).where(eq(cartItems.cartId, cartId));
  }

  async addCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const [cartItem] = await db.insert(cartItems).values({
      ...insertCartItem,
      quantity: insertCartItem.quantity || 1
    }).returning();
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const [cartItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return cartItem;
  }

  async deleteCartItem(id: number): Promise<boolean> {
    const result = await db
      .delete(cartItems)
      .where(eq(cartItems.id, id))
      .returning({ id: cartItems.id });
    return result.length > 0;
  }

  async clearCart(cartId: number): Promise<boolean> {
    const result = await db
      .delete(cartItems)
      .where(eq(cartItems.cartId, cartId))
      .returning({ id: cartItems.id });
    return result.length > 0;
  }
}

/* 
// Database implementation and initialization is commented out until PostgreSQL issues are resolved
async function initializeDatabase() {
  try {
    // Check if testimonials already exist
    const existingTestimonials = await db.select().from(testimonials);
    if (existingTestimonials.length === 0) {
      console.log("Initializing database with sample testimonials...");
      await db.insert(testimonials).values([
        {
          name: "Julia Roman",
          content: "Andreea a transformat visul meu in realitate. Recomand serviciile pentru orice eveniment.",
          rating: 5,
          displayOrder: 1
        },
        {
          name: "Daniela Bratu",
          content: "Apreciez deschiderea cu care Andreea lucreaza. Foarte receptiva si profesionala.",
          rating: 5,
          displayOrder: 2
        }
      ]);
    }

    // Check if products already exist
    const existingProducts = await db.select().from(products);
    if (existingProducts.length === 0) {
      console.log("Initializing database with sample products...");
      await db.insert(products).values([
        {
          name: "Buchet de trandafiri roz",
          description: "Un buchet elegant de trandafiri roz, perfect pentru a exprima afecțiune și admirație.",
          price: "180.00",
          imageUrl: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "buchete",
          stock: 15,
          createdAt: new Date()
        },
        {
          name: "Aranjament floral pentru masa",
          description: "Aranjament floral de sezon, perfect pentru decorarea mesei la ocazii speciale.",
          price: "250.00",
          imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "aranjamente",
          stock: 10,
          createdAt: new Date()
        },
        {
          name: "Coronita din flori de camp",
          description: "Coronita delicata din flori de camp, ideala pentru evenimente in aer liber si nunti rustice.",
          price: "120.00",
          imageUrl: "https://images.unsplash.com/photo-1533616688419-b7a585564566?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "coronite",
          stock: 8,
          createdAt: new Date()
        },
        {
          name: "Buchet de mireasa",
          description: "Buchet de mireasa elegant cu trandafiri albi si accente de verdeata, perfect pentru ziua cea mare.",
          price: "350.00",
          imageUrl: "https://images.unsplash.com/photo-1551893665-f843f600794e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "nunta",
          stock: 5,
          createdAt: new Date()
        },
        {
          name: "Aranjament floral corporate",
          description: "Aranjament floral sofisticat pentru birouri si evenimente corporate.",
          price: "280.00",
          imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "corporate",
          stock: 12,
          createdAt: new Date()
        },
        {
          name: "Cutie cu flori mixte",
          description: "Cutie eleganta cu flori sezoniere mixte, un cadou perfect pentru orice ocazie.",
          price: "220.00",
          imageUrl: "https://images.unsplash.com/photo-1521543832500-49e69fb2bea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "cutii",
          stock: 20,
          createdAt: new Date()
        }
      ]);
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
*/

// For now, use in-memory storage until we resolve PostgreSQL connection issues
export const storage = new MemStorage();