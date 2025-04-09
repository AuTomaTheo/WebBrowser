import { 
  users, type User, type InsertUser,
  subscribers, type Subscriber, type InsertSubscriber,
  testimonials, type Testimonial, type InsertTestimonial
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subscriber methods
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscribers: Map<number, Subscriber>;
  private testimonials: Map<number, Testimonial>;
  
  private currentUserId: number;
  private currentSubscriberId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.subscribers = new Map();
    this.testimonials = new Map();
    
    this.currentUserId = 1;
    this.currentSubscriberId = 1;
    this.currentTestimonialId = 1;
    
    // Initialize with some testimonials
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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
}

export const storage = new MemStorage();