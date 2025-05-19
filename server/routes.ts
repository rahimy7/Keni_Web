import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    const stats = await storage.getDashboardStats();
    res.json(stats);
  });
  
  // Recent orders
  app.get("/api/orders/recent", async (req, res) => {
    const orders = await storage.getRecentOrders();
    res.json(orders);
  });
  
  // Top selling products
  app.get("/api/products/top-selling", async (req, res) => {
    const products = await storage.getTopSellingProducts();
    res.json(products);
  });
  
  // Recent activities
  app.get("/api/activities/recent", async (req, res) => {
    const activities = await storage.getRecentActivities();
    res.json(activities);
  });
  
  // All orders
  app.get("/api/orders", async (req, res) => {
    const orders = await storage.getAllOrders();
    res.json(orders);
  });
  
  // All products
  app.get("/api/products", async (req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });
  
  // All users
  app.get("/api/users", async (req, res) => {
    const users = await storage.getAllUsers();
    res.json(users);
  });

  const httpServer = createServer(app);

  return httpServer;
}
