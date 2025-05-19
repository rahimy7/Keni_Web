import { 
  users, 
  type User, 
  type InsertUser, 
  Product, 
  Order, 
  Activity,
  DashboardStats
} from "@shared/schema";

// Interface for all storage operations needed in the app
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Product operations
  getTopSellingProducts(): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  
  // Order operations
  getRecentOrders(): Promise<Order[]>;
  getAllOrders(): Promise<Order[]>;
  
  // Activity operations
  getRecentActivities(): Promise<Activity[]>;
  
  // Dashboard stats
  getDashboardStats(): Promise<DashboardStats>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private activities: Map<number, Activity>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.activities = new Map();
    this.currentId = 1;
    
    // Add some sample data
    this.initializeSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  // Product operations
  async getTopSellingProducts(): Promise<Product[]> {
    const products = Array.from(this.products.values());
    // Sort by sales in descending order and take the top 3
    return products.sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 3);
  }
  
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  // Order operations
  async getRecentOrders(): Promise<Order[]> {
    const orders = Array.from(this.orders.values());
    // Sort by creation date in descending order and take the top 4
    return orders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 4);
  }
  
  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  // Activity operations
  async getRecentActivities(): Promise<Activity[]> {
    const activities = Array.from(this.activities.values());
    // Sort by creation date in descending order and take the top 4
    return activities.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 4);
  }
  
  // Dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    return {
      usersTotal: "5,248",
      usersChange: 12.3,
      ordersTotal: "1,473",
      ordersChange: 8.2,
      revenue: "$48,592",
      revenueChange: -3.1,
      productsTotal: "892",
      productsChange: 4.7
    };
  }
  
  // Initialize some sample data
  private initializeSampleData() {
    // Sample users
    this.users.set(1, {
      id: 1,
      username: "juan.perez",
      password: "password123",
      email: "juan.perez@ejemplo.com",
      role: "admin",
      createdAt: new Date()
    });
    
    this.users.set(2, {
      id: 2,
      username: "maria.gonzalez",
      password: "password123",
      email: "maria.gonzalez@ejemplo.com",
      role: "user",
      createdAt: new Date()
    });
    
    // Sample products
    this.products.set(1, {
      id: 1,
      productId: "PRD-001",
      name: "Auriculares Inalámbricos Pro",
      description: "Auriculares inalámbricos de alta calidad con cancelación de ruido",
      price: "$159.99",
      category: "Electrónica",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80",
      sales: 324,
      createdAt: new Date()
    });
    
    this.products.set(2, {
      id: 2,
      productId: "PRD-002",
      name: "Altavoz Bluetooth Portátil",
      description: "Altavoz portátil con 20 horas de batería y resistente al agua",
      price: "$89.99",
      category: "Electrónica",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80",
      sales: 256,
      createdAt: new Date()
    });
    
    this.products.set(3, {
      id: 3,
      productId: "PRD-003",
      name: "Zapatillas Deportivas Run+",
      description: "Zapatillas para correr de alto rendimiento con amortiguación extra",
      price: "$129.99",
      category: "Ropa",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80",
      sales: 198,
      createdAt: new Date()
    });
    
    // Sample orders
    this.orders.set(1, {
      id: 1,
      orderNumber: "ORD-0102",
      userId: 2,
      status: "Entregado",
      total: "$124.00",
      date: "24 May, 2023",
      createdAt: new Date(),
      customer: {
        name: "María González",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
      }
    });
    
    this.orders.set(2, {
      id: 2,
      orderNumber: "ORD-0101",
      userId: 3,
      status: "En proceso",
      total: "$89.50",
      date: "24 May, 2023",
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
      customer: {
        name: "Carlos Rodríguez",
        avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
      }
    });
    
    this.orders.set(3, {
      id: 3,
      orderNumber: "ORD-0100",
      userId: 4,
      status: "Cancelado",
      total: "$215.75",
      date: "23 May, 2023",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      customer: {
        name: "Ana Martínez",
        avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
      }
    });
    
    this.orders.set(4, {
      id: 4,
      orderNumber: "ORD-0099",
      userId: 5,
      status: "Entregado",
      total: "$67.25",
      date: "23 May, 2023",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      customer: {
        name: "Luis Hernández",
        avatarUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
      }
    });
    
    // Sample activities
    this.activities.set(1, {
      id: 1,
      type: "user",
      message: "Nuevo usuario registrado <span class=\"font-medium\">Laura Sánchez</span>",
      timeAgo: "Hace 5 minutos",
      createdAt: new Date()
    });
    
    this.activities.set(2, {
      id: 2,
      type: "order",
      message: "Nuevo pedido <span class=\"font-medium\">#ORD-0102</span> completado",
      timeAgo: "Hace 27 minutos",
      createdAt: new Date(Date.now() - 1000 * 60 * 27)
    });
    
    this.activities.set(3, {
      id: 3,
      type: "refund",
      message: "Solicitud de reembolso para el pedido <span class=\"font-medium\">#ORD-0097</span>",
      timeAgo: "Hace 1 hora",
      createdAt: new Date(Date.now() - 1000 * 60 * 60)
    });
    
    this.activities.set(4, {
      id: 4,
      type: "message",
      message: "Nuevo mensaje de <span class=\"font-medium\">Carlos Rodríguez</span>",
      timeAgo: "Hace 3 horas",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3)
    });
  }
}

// Export the storage instance
export const storage = new MemStorage();
