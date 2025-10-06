import { type User, type InsertUser, type Wallet, type InsertWallet, users, wallets } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { getPool } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getWallet(id: string): Promise<Wallet | undefined>;
  getWalletsByUserId(userId: string): Promise<Wallet[]>;
  getWalletByAddress(address: string): Promise<Wallet | undefined>;
  createWallet(wallet: InsertWallet): Promise<Wallet>;
  deleteWallet(id: string): Promise<void>;
}

export class DbStorage implements IStorage {
  private db;

  constructor() {
    const pool = getPool();
    this.db = drizzle(pool);
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    if (result.length === 0) {
      throw new Error("Failed to create user");
    }
    return result[0];
  }

  async getWallet(id: string): Promise<Wallet | undefined> {
    const result = await this.db.select().from(wallets).where(eq(wallets.id, id)).limit(1);
    return result[0];
  }

  async getWalletsByUserId(userId: string): Promise<Wallet[]> {
    return await this.db.select().from(wallets).where(eq(wallets.userId, userId));
  }

  async getWalletByAddress(address: string): Promise<Wallet | undefined> {
    const result = await this.db.select().from(wallets).where(eq(wallets.address, address)).limit(1);
    return result[0];
  }

  async createWallet(insertWallet: InsertWallet): Promise<Wallet> {
    const result = await this.db.insert(wallets).values(insertWallet).returning();
    if (result.length === 0) {
      throw new Error("Failed to create wallet");
    }
    return result[0];
  }

  async deleteWallet(id: string): Promise<void> {
    await this.db.delete(wallets).where(eq(wallets.id, id));
  }
}

export const storage = new DbStorage();
