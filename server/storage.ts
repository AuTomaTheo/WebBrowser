import { 
  users, type User, type InsertUser,
  subscribers, type Subscriber, type InsertSubscriber,
  testimonials, type Testimonial, type InsertTestimonial,
  verificationTokens, type VerificationToken, type InsertVerificationToken,
  wishlists, type Wishlist, type InsertWishlist,
  wishlistItems, type WishlistItem, type InsertWishlistItem,
  galleryImages, type GalleryImage, type InsertGalleryImage,
  galleryEvents, type GalleryEvent, type InsertGalleryEvent
} from "@shared/schema";
import session from "express-session";
import { db } from "./db";
import { eq, asc, desc } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import { Pool } from 'pg';

export interface IStorage {
  // Session store
  sessionStore: session.Store;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Subscriber methods
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Verification token methods
  createOrUpdateVerificationToken(token: InsertVerificationToken): Promise<VerificationToken>;
  getVerificationToken(userId: number, token: string): Promise<VerificationToken | undefined>;
  markVerificationTokenAsUsed(userId: number, token: string): Promise<boolean>;
  
  // Wishlist methods
  getWishlist(userId: number): Promise<Wishlist | undefined>;
  createWishlist(wishlist: InsertWishlist): Promise<Wishlist>;
  
  // Wishlist item methods
  getWishlistItems(wishlistId: number): Promise<WishlistItem[]>;
  addToWishlist(wishlistItem: InsertWishlistItem): Promise<WishlistItem>;
  removeFromWishlist(wishlistItemId: number): Promise<boolean>;
  
  // Gallery image methods
  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImagesByCategory(category: string): Promise<GalleryImage[]>;
  getGalleryImagesByEvent(eventId: number): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: number): Promise<boolean>;
  
  // Gallery event methods
  getGalleryEvents(): Promise<GalleryEvent[]>;
  getGalleryEventsByCategory(category: string): Promise<GalleryEvent[]>;
  createGalleryEvent(event: InsertGalleryEvent): Promise<GalleryEvent>;
  deleteGalleryEvent(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: Map<number, User>;
  private subscribers: Map<number, Subscriber>;
  private testimonials: Map<number, Testimonial>;
  private verificationTokens: Map<number, VerificationToken>;
  private wishlists: Map<number, Wishlist>;
  private wishlistItems: Map<number, WishlistItem>;
  private galleryImagesMap: Map<number, GalleryImage>;
  private galleryEventsMap: Map<number, GalleryEvent>;
  
  private currentUserId: number;
  private currentSubscriberId: number;
  private currentTestimonialId: number;
  private currentVerificationTokenId: number;
  private currentWishlistId: number;
  private currentWishlistItemId: number;
  private currentGalleryImageId: number;
  private currentGalleryEventId: number;
  
  constructor() {
    // Initialize in-memory session store
    const MemoryStore = require('memorystore')(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize data structures
    this.users = new Map();
    this.subscribers = new Map();
    this.testimonials = new Map();
    this.verificationTokens = new Map();
    this.wishlists = new Map();
    this.wishlistItems = new Map();
    this.galleryImagesMap = new Map();
    this.galleryEventsMap = new Map();
    
    this.currentUserId = 1;
    this.currentSubscriberId = 1;
    this.currentTestimonialId = 1;
    this.currentVerificationTokenId = 1;
    this.currentWishlistId = 1;
    this.currentWishlistItemId = 1;
    this.currentGalleryImageId = 1;
    this.currentGalleryEventId = 1;
    
    // Initialize with sample data
    this.initializeTestimonials();
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
      emailVerified: insertUser.emailVerified || false,
      isActive: insertUser.isActive || false
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
  
  // Verification token methods
  async createOrUpdateVerificationToken(tokenData: InsertVerificationToken): Promise<VerificationToken> {
    this.verificationTokens = this.verificationTokens || new Map();
    this.currentVerificationTokenId = this.currentVerificationTokenId || 1;
    
    // Check if there's an existing token for this user
    const existingToken = Array.from(this.verificationTokens.values()).find(
      token => token.userId === tokenData.userId
    );
    
    if (existingToken) {
      // Update existing token
      const updatedToken = {
        ...existingToken,
        token: tokenData.token,
        createdAt: new Date(),
        used: false
      };
      this.verificationTokens.set(existingToken.id, updatedToken);
      return updatedToken;
    } else {
      // Create new token
      const id = this.currentVerificationTokenId++;
      const now = new Date();
      // Set expiration to 24 hours from now
      const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const newToken: VerificationToken = {
        id,
        userId: tokenData.userId,
        token: tokenData.token,
        used: false,
        createdAt: now,
        expiresAt: expiresAt
      };
      this.verificationTokens.set(id, newToken);
      return newToken;
    }
  }
  
  async getVerificationToken(userId: number, token: string): Promise<VerificationToken | undefined> {
    this.verificationTokens = this.verificationTokens || new Map();
    
    return Array.from(this.verificationTokens.values()).find(
      verificationToken => verificationToken.userId === userId && verificationToken.token === token
    );
  }
  
  async markVerificationTokenAsUsed(userId: number, token: string): Promise<boolean> {
    this.verificationTokens = this.verificationTokens || new Map();
    
    const verificationToken = Array.from(this.verificationTokens.values()).find(
      t => t.userId === userId && t.token === token
    );
    
    if (!verificationToken) return false;
    
    const updatedToken = { ...verificationToken, used: true };
    this.verificationTokens.set(verificationToken.id, updatedToken);
    return true;
  }
  
  // Wishlist methods
  async getWishlist(userId: number): Promise<Wishlist | undefined> {
    this.wishlists = this.wishlists || new Map();
    
    return Array.from(this.wishlists.values()).find(
      wishlist => wishlist.userId === userId
    );
  }
  
  async createWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    this.wishlists = this.wishlists || new Map();
    this.currentWishlistId = this.currentWishlistId || 1;
    
    const id = this.currentWishlistId++;
    const now = new Date();
    const wishlist: Wishlist = {
      id,
      userId: insertWishlist.userId,
      createdAt: now
    };
    this.wishlists.set(id, wishlist);
    return wishlist;
  }
  
  // Wishlist item methods
  async getWishlistItems(wishlistId: number): Promise<WishlistItem[]> {
    this.wishlistItems = this.wishlistItems || new Map();
    
    return Array.from(this.wishlistItems.values()).filter(
      item => item.wishlistId === wishlistId
    );
  }
  
  async addToWishlist(insertWishlistItem: InsertWishlistItem): Promise<WishlistItem> {
    this.wishlistItems = this.wishlistItems || new Map();
    this.currentWishlistItemId = this.currentWishlistItemId || 1;
    
    const id = this.currentWishlistItemId++;
    const now = new Date();
    const wishlistItem: WishlistItem = {
      id,
      wishlistId: insertWishlistItem.wishlistId,
      itemName: insertWishlistItem.itemName,
      itemDescription: insertWishlistItem.itemDescription || null,
      itemImageUrl: insertWishlistItem.itemImageUrl || null,
      addedAt: now
    };
    this.wishlistItems.set(id, wishlistItem);
    return wishlistItem;
  }
  
  async removeFromWishlist(wishlistItemId: number): Promise<boolean> {
    this.wishlistItems = this.wishlistItems || new Map();
    return this.wishlistItems.delete(wishlistItemId);
  }
  
  // Gallery image methods
  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImagesMap.values()).sort(
      (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
    );
  }
  
  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    return Array.from(this.galleryImagesMap.values())
      .filter(img => img.category === category)
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }
  
  async getGalleryImagesByEvent(eventId: number): Promise<GalleryImage[]> {
    return Array.from(this.galleryImagesMap.values())
      .filter(img => img.eventId === eventId)
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }
  
  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.currentGalleryImageId++;
    const now = new Date();
    const image: GalleryImage = {
      id,
      filename: insertImage.filename,
      url: insertImage.url,
      category: insertImage.category,
      eventId: insertImage.eventId || null,
      alt: insertImage.alt || null,
      uploadedAt: now
    };
    this.galleryImagesMap.set(id, image);
    return image;
  }
  
  async deleteGalleryImage(id: number): Promise<boolean> {
    return this.galleryImagesMap.delete(id);
  }
  
  // Gallery event methods
  async getGalleryEvents(): Promise<GalleryEvent[]> {
    return Array.from(this.galleryEventsMap.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async getGalleryEventsByCategory(category: string): Promise<GalleryEvent[]> {
    return Array.from(this.galleryEventsMap.values())
      .filter(event => event.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createGalleryEvent(insertEvent: InsertGalleryEvent): Promise<GalleryEvent> {
    const id = this.currentGalleryEventId++;
    const now = new Date();
    const event: GalleryEvent = {
      id,
      name: insertEvent.name,
      category: insertEvent.category,
      createdAt: now
    };
    this.galleryEventsMap.set(id, event);
    return event;
  }
  
  async deleteGalleryEvent(id: number): Promise<boolean> {
    return this.galleryEventsMap.delete(id);
  }
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    // Initialize session store with PostgreSQL
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      },
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
    return db.select().from(testimonials)
      .where(eq(testimonials.approved, true))
      .orderBy(asc(testimonials.displayOrder));
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
  
  // Verification token methods
  async createOrUpdateVerificationToken(tokenData: InsertVerificationToken): Promise<VerificationToken> {
    // First check if token exists for this user
    const [existingToken] = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.userId, tokenData.userId));
    
    if (existingToken) {
      // Update existing token
      const [updatedToken] = await db
        .update(verificationTokens)
        .set({
          token: tokenData.token,
          expiresAt: tokenData.expiresAt,
          used: tokenData.used
        })
        .where(eq(verificationTokens.userId, tokenData.userId))
        .returning();
      
      return updatedToken;
    } else {
      // Create new token
      const [newToken] = await db
        .insert(verificationTokens)
        .values({
          ...tokenData,
          createdAt: new Date()
        })
        .returning();
      
      return newToken;
    }
  }
  
  async getVerificationToken(userId: number, token: string): Promise<VerificationToken | undefined> {
    const [verificationToken] = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.userId, userId));
    
    if (verificationToken && verificationToken.token === token) {
      return verificationToken;
    }
    
    return undefined;
  }
  
  async markVerificationTokenAsUsed(userId: number, token: string): Promise<boolean> {
    const [updatedToken] = await db
      .update(verificationTokens)
      .set({ used: true })
      .where(eq(verificationTokens.userId, userId))
      .returning();
    
    return !!updatedToken && updatedToken.token === token;
  }
  
  // Wishlist methods
  async getWishlist(userId: number): Promise<Wishlist | undefined> {
    const [wishlist] = await db
      .select()
      .from(wishlists)
      .where(eq(wishlists.userId, userId));
    
    return wishlist;
  }
  
  async createWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    const [wishlist] = await db
      .insert(wishlists)
      .values({
        ...insertWishlist,
        createdAt: new Date()
      })
      .returning();
    
    return wishlist;
  }
  
  // Wishlist item methods
  async getWishlistItems(wishlistId: number): Promise<WishlistItem[]> {
    return db
      .select()
      .from(wishlistItems)
      .where(eq(wishlistItems.wishlistId, wishlistId));
  }
  
  async addToWishlist(insertWishlistItem: InsertWishlistItem): Promise<WishlistItem> {
    const [wishlistItem] = await db
      .insert(wishlistItems)
      .values({
        ...insertWishlistItem,
        addedAt: new Date()
      })
      .returning();
    
    return wishlistItem;
  }
  
  async removeFromWishlist(wishlistItemId: number): Promise<boolean> {
    const result = await db
      .delete(wishlistItems)
      .where(eq(wishlistItems.id, wishlistItemId))
      .returning({ id: wishlistItems.id });
    
    return result.length > 0;
  }
  
  // Gallery image methods
  async getGalleryImages(): Promise<GalleryImage[]> {
    return db.select().from(galleryImages).orderBy(desc(galleryImages.uploadedAt));
  }
  
  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    return db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.category, category))
      .orderBy(desc(galleryImages.uploadedAt));
  }
  
  async getGalleryImagesByEvent(eventId: number): Promise<GalleryImage[]> {
    return db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.eventId, eventId))
      .orderBy(desc(galleryImages.uploadedAt));
  }
  
  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const [image] = await db
      .insert(galleryImages)
      .values({
        ...insertImage,
        uploadedAt: new Date()
      })
      .returning();
    return image;
  }
  
  async deleteGalleryImage(id: number): Promise<boolean> {
    const result = await db
      .delete(galleryImages)
      .where(eq(galleryImages.id, id))
      .returning({ id: galleryImages.id });
    return result.length > 0;
  }
  
  // Gallery event methods
  async getGalleryEvents(): Promise<GalleryEvent[]> {
    return db.select().from(galleryEvents).orderBy(desc(galleryEvents.createdAt));
  }
  
  async getGalleryEventsByCategory(category: string): Promise<GalleryEvent[]> {
    return db
      .select()
      .from(galleryEvents)
      .where(eq(galleryEvents.category, category))
      .orderBy(desc(galleryEvents.createdAt));
  }
  
  async createGalleryEvent(insertEvent: InsertGalleryEvent): Promise<GalleryEvent> {
    const [event] = await db
      .insert(galleryEvents)
      .values({
        ...insertEvent,
        createdAt: new Date()
      })
      .returning();
    return event;
  }
  
  async deleteGalleryEvent(id: number): Promise<boolean> {
    const result = await db
      .delete(galleryEvents)
      .where(eq(galleryEvents.id, id))
      .returning({ id: galleryEvents.id });
    return result.length > 0;
  }
}

// Initialize database with sample data
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

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// Use database storage for persistence
export const storage = new DatabaseStorage();

// Initialize the database with sample data
initializeDatabase();