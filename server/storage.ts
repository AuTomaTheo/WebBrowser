import { users, type User, type InsertUser, subscriptions, type Subscription, type InsertSubscription, testimonials, type Testimonial, type InsertTestimonial } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getSubscriptions(): Promise<Subscription[]>;
  getSubscriptionByEmail(email: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscriptionsMap: Map<number, Subscription>;
  private testimonialsMap: Map<number, Testimonial>;
  
  currentUserId: number;
  currentSubscriptionId: number;
  currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.subscriptionsMap = new Map();
    this.testimonialsMap = new Map();
    
    this.currentUserId = 1;
    this.currentSubscriptionId = 1;
    this.currentTestimonialId = 1;
    
    // Add some initial testimonials
    this.createTestimonial({
      name: "Julia Roman",
      content: [
        "Andreea mi-a transformat visul in realitate.",
        "Datorita ei am reusit sa creez decoruri minunate pentru evenimente."
      ],
      rating: 5
    });
    
    this.createTestimonial({
      name: "Daniela Bratu",
      content: [
        "Apreciez deschiderea cu care Andreea lucreaza - de fiecare data cand ne-am intalnit a fost foarte atenta la detalii."
      ],
      rating: 5
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Subscription methods
  async getSubscriptions(): Promise<Subscription[]> {
    return Array.from(this.subscriptionsMap.values());
  }
  
  async getSubscriptionByEmail(email: string): Promise<Subscription | undefined> {
    return Array.from(this.subscriptionsMap.values()).find(
      (subscription) => subscription.email === email,
    );
  }
  
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubscriptionId++;
    const subscription: Subscription = { 
      ...insertSubscription, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.subscriptionsMap.set(id, subscription);
    return subscription;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialsMap.values());
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonialsMap.get(id);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonialsMap.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
