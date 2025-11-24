import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  postalCode: text("postal_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  emailVerified: boolean("email_verified").default(false),
  isActive: boolean("is_active").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  emailVerified: true,
  isActive: true,
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  active: boolean("active").default(true).notNull(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  displayOrder: integer("display_order").default(0),
});

export const insertTestimonialSchema = createInsertSchema(testimonials);

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

// Verification tokens schema
export const verificationTokens = pgTable("verification_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVerificationTokenSchema = createInsertSchema(verificationTokens).pick({
  userId: true,
  token: true,
  expiresAt: true,
  used: true,
});

export type VerificationToken = typeof verificationTokens.$inferSelect;
export type InsertVerificationToken = z.infer<typeof insertVerificationTokenSchema>;

// Wishlist schema - keeping wishlist functionality for favoriting items
export const wishlists = pgTable("wishlists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWishlistSchema = createInsertSchema(wishlists).pick({
  userId: true,
});

// Wishlist item schema
export const wishlistItems = pgTable("wishlist_items", {
  id: serial("id").primaryKey(),
  wishlistId: integer("wishlist_id").notNull(),
  itemName: text("item_name").notNull(),
  itemDescription: text("item_description"),
  itemImageUrl: text("item_image_url"),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const insertWishlistItemSchema = createInsertSchema(wishlistItems).pick({
  wishlistId: true,
  itemName: true,
  itemDescription: true,
  itemImageUrl: true,
});

export type Wishlist = typeof wishlists.$inferSelect;
export type InsertWishlist = z.infer<typeof insertWishlistSchema>;
export type WishlistItem = typeof wishlistItems.$inferSelect;
export type InsertWishlistItem = z.infer<typeof insertWishlistItemSchema>;
