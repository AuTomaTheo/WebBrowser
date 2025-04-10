import crypto from 'crypto';
import { User } from '@shared/schema';
import { db } from './db';
import { storage } from './storage';

// In a production environment, this would use a real email service like SendGrid
// For demonstration purposes, we'll use console.log to show the verification links
export async function sendVerificationEmail(user: User, verificationToken: string) {
  // Base URL of the application
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  const verificationUrl = `${baseUrl}/api/verify-email?token=${verificationToken}&userId=${user.id}`;
  
  console.log(`
    ============================================================
    EMAIL VERIFICATION LINK FOR ${user.email}:
    ${verificationUrl}
    ============================================================
  `);
  
  return true;
}

// Generate a secure random token for email verification
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Store verification token in the database
export async function storeVerificationToken(userId: number, token: string): Promise<boolean> {
  try {
    // Store token with expiration (24 hours)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now
    
    await storage.createOrUpdateVerificationToken({
      userId,
      token,
      expiresAt,
      used: false
    });
    
    return true;
  } catch (error) {
    console.error('Error storing verification token:', error);
    return false;
  }
}

// Verify the token
export async function verifyEmailToken(userId: number, token: string): Promise<boolean> {
  try {
    const storedToken = await storage.getVerificationToken(userId, token);
    
    if (!storedToken) {
      return false; // Token not found
    }
    
    if (storedToken.used) {
      return false; // Token already used
    }
    
    const now = new Date();
    if (now > storedToken.expiresAt) {
      return false; // Token expired
    }
    
    // Mark token as used
    await storage.markVerificationTokenAsUsed(userId, token);
    
    // Update user's verification status
    await storage.updateUser(userId, { emailVerified: true });
    
    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}