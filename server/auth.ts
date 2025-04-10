import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import crypto, { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "ac1d72cc-62b5-4964-9f36-43a7a7749082",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      // Check if username exists
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Check if email exists
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Create user with email verification fields
      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
        emailVerified: false,
        isActive: false
      });

      // Generate verification token
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now
      
      try {
        // Store verification token
        await storage.createOrUpdateVerificationToken({
          userId: user.id,
          token,
          expiresAt,
          used: false
        });
        
        // In a production environment, this would send a real email
        // For this demo, we'll log it to the console
        const baseUrl = process.env.BASE_URL || `http://localhost:5000`;
        const verificationUrl = `${baseUrl}/verify-email?token=${token}&userId=${user.id}`;
        
        console.log(`
          ============================================================
          EMAIL VERIFICATION LINK FOR ${user.email}:
          ${verificationUrl}
          ============================================================
        `);
        
        // Create session for the user even though they're not verified yet
        req.login(user, (err) => {
          if (err) return next(err);
          res.status(201).json({
            ...user,
            verificationEmailSent: true,
            message: "Please check your email to verify your account"
          });
        });
      } catch (error) {
        console.error("Error sending verification email:", error);
        // Still allow login even if email verification setup fails
        req.login(user, (err) => {
          if (err) return next(err);
          res.status(201).json({
            ...user,
            verificationEmailSent: false,
            message: "Account created but unable to send verification email"
          });
        });
      }
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: Express.User | false, info: { message: string } | undefined) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Invalid username or password" });
      
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        return res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
  
  app.get("/api/verify-email", async (req, res) => {
    try {
      const { token, userId } = req.query;
      
      if (!token || !userId) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing token or user ID" 
        });
      }
      
      // Get token record
      const tokenRecord = await storage.getVerificationToken(
        parseInt(userId as string, 10), 
        token as string
      );
      
      if (!tokenRecord) {
        return res.status(400).json({
          success: false,
          message: "Invalid verification token"
        });
      }
      
      if (tokenRecord.used) {
        return res.status(400).json({
          success: false,
          message: "Token already used"
        });
      }
      
      const now = new Date();
      if (now > tokenRecord.expiresAt) {
        return res.status(400).json({
          success: false,
          message: "Token expired"
        });
      }
      
      // Mark token as used
      await storage.markVerificationTokenAsUsed(
        parseInt(userId as string, 10), 
        token as string
      );
      
      // Update user's verification status
      await storage.updateUser(parseInt(userId as string, 10), { 
        emailVerified: true,
        isActive: true
      });
      
      res.status(200).json({
        success: true,
        message: "Email verified successfully"
      });
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while verifying your email"
      });
    }
  });
}