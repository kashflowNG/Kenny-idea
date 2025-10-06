import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertWalletSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { getPool } from "./db";
import { 
  createNewWallet, 
  importWallet, 
  getTRXBalance, 
  getUSDTBalance,
  sendTRX,
  sendUSDT,
  getTRXPrice,
  getTransactionHistory
} from "./tron";
import { generateDemoProfile } from "./demo";

const PgSession = connectPgSimple(session);

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  if (!process.env.SESSION_SECRET && process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET environment variable is required in production');
  }

  const sessionStore = process.env.DATABASE_URL 
    ? new PgSession({
        pool: getPool(),
        createTableIfMissing: true,
      })
    : undefined;

  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || 'dev-secret-key-change-in-production',
      resave: false,
      saveUninitialized: false,
      name: 'sessionId',
      proxy: true,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
      },
    })
  );

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password, pin } = insertUserSchema.parse(req.body);

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPin = await bcrypt.hash(pin, 10);

      const user = await storage.createUser({
        username,
        password: hashedPassword,
        pin: hashedPin,
      });

      req.session.userId = user.id;
      await new Promise((resolve) => req.session.save(resolve));
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve(undefined);
        });
      });
      
      console.log('Session after login:', req.session.userId, 'SessionID:', req.sessionID);
      
      // Send session ID in response header as backup
      res.setHeader('X-Session-ID', req.sessionID);
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(400).json({ error: error.message || "Login failed" });
    }
  });

  app.post("/api/auth/verify-pin", async (req, res) => {
    try {
      console.log('PIN verification - SessionID:', req.sessionID, 'UserID:', req.session.userId);
      console.log('Session data:', req.session);
      console.log('Cookies:', req.headers.cookie);
      
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { pin } = req.body;
      const user = await storage.getUser(req.session.userId);

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      console.log('PIN verification details:');
      console.log('- Received PIN:', pin);
      console.log('- PIN length:', pin?.length);
      console.log('- Stored hash:', user.pin);
      console.log('- Hash length:', user.pin?.length);

      const validPin = await bcrypt.compare(pin, user.pin);
      console.log('- PIN valid:', validPin);
      
      if (!validPin) {
        return res.status(401).json({ error: "Invalid PIN" });
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error('PIN verification error:', error);
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      res.json({ user: { id: user.id, username: user.username } });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/wallets/create", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { address, privateKey } = await createNewWallet();

      const wallet = await storage.createWallet({
        userId: req.session.userId,
        address,
        privateKey,
        isDemo: false,
      });

      res.json({ wallet: { id: wallet.id, address: wallet.address } });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create wallet" });
    }
  });

  app.post("/api/wallets/import", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { privateKey } = req.body;
      const { address } = await importWallet(privateKey);

      const existingWallet = await storage.getWalletByAddress(address);
      if (existingWallet) {
        return res.status(400).json({ error: "Wallet already exists" });
      }

      const wallet = await storage.createWallet({
        userId: req.session.userId,
        address,
        privateKey,
        isDemo: false,
      });

      res.json({ wallet: { id: wallet.id, address: wallet.address } });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to import wallet" });
    }
  });

  app.post("/api/wallets/demo", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { address, privateKey } = await createNewWallet();
      const demoProfile = generateDemoProfile();

      const wallet = await storage.createWallet({
        userId: req.session.userId,
        address,
        privateKey,
        isDemo: true,
        demoEmail: demoProfile.email,
        demoPhone: demoProfile.phone,
        demoPassword: demoProfile.password,
      });

      res.json({ 
        wallet: { 
          id: wallet.id, 
          address: wallet.address,
          isDemo: true,
          demoProfile: {
            email: demoProfile.email,
            phone: demoProfile.phone,
            password: demoProfile.password,
          }
        } 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create demo wallet" });
    }
  });

  app.get("/api/wallets", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const wallets = await storage.getWalletsByUserId(req.session.userId);

      const walletsWithBalances = await Promise.all(
        wallets.map(async (wallet) => {
          const trxBalance = await getTRXBalance(wallet.address);
          const usdtBalance = await getUSDTBalance(wallet.address);
          const trxPrice = await getTRXPrice();

          return {
            id: wallet.id,
            address: wallet.address,
            trxBalance,
            usdtBalance,
            usdValue: (trxBalance * trxPrice).toFixed(2),
            isDemo: wallet.isDemo,
            demoProfile: wallet.isDemo ? {
              email: wallet.demoEmail,
              phone: wallet.demoPhone,
              password: wallet.demoPassword,
            } : undefined,
          };
        })
      );

      res.json({ wallets: walletsWithBalances });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/wallets/:id", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const wallet = await storage.getWallet(req.params.id);
      if (!wallet || wallet.userId !== req.session.userId) {
        return res.status(404).json({ error: "Wallet not found" });
      }

      const trxBalance = await getTRXBalance(wallet.address);
      const usdtBalance = await getUSDTBalance(wallet.address);
      const trxPrice = await getTRXPrice();
      const transactions = await getTransactionHistory(wallet.address);

      res.json({
        wallet: {
          id: wallet.id,
          address: wallet.address,
          trxBalance,
          usdtBalance,
          usdValue: (trxBalance * trxPrice).toFixed(2),
          isDemo: wallet.isDemo,
          demoProfile: wallet.isDemo ? {
            email: wallet.demoEmail,
            phone: wallet.demoPhone,
            password: wallet.demoPassword,
          } : undefined,
          transactions,
        }
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/wallets/:id", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const wallet = await storage.getWallet(req.params.id);
      if (!wallet || wallet.userId !== req.session.userId) {
        return res.status(404).json({ error: "Wallet not found" });
      }

      await storage.deleteWallet(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/wallets/:id/send", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const wallet = await storage.getWallet(req.params.id);
      if (!wallet || wallet.userId !== req.session.userId) {
        return res.status(404).json({ error: "Wallet not found" });
      }

      const { toAddress, amount, currency } = req.body;

      let result;
      if (currency === 'TRX') {
        result = await sendTRX(wallet.privateKey, toAddress, Number(amount));
      } else if (currency === 'USDT') {
        result = await sendUSDT(wallet.privateKey, toAddress, Number(amount));
      } else {
        return res.status(400).json({ error: "Invalid currency" });
      }

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      res.json({ 
        success: true, 
        txId: result.txId,
        transaction: result.transaction 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Transaction failed" });
    }
  });

  app.get("/api/price/trx", async (req, res) => {
    try {
      const price = await getTRXPrice();
      res.json({ price });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}