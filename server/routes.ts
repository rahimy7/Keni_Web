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


app.get("/api/professional-areas", async (req, res) => {
  try {
    const areas = await storage.getProfessionalAreas();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch professional areas" });
  }
});

app.post("/api/professional-areas", async (req, res) => {
  try {
    const area = await storage.createProfessionalArea(req.body);
    res.json(area);
  } catch (error) {
    res.status(500).json({ error: "Failed to create professional area" });
  }
});

// Jobs (Public routes)
app.get("/api/jobs", async (req, res) => {
  try {
    const { areaId } = req.query;
    const jobs = await storage.getJobs({ 
      professionalAreaId: areaId ? parseInt(areaId as string) : undefined,
      isActive: true 
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const job = await storage.createJob(req.body);
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
});

// User Profiles (Public routes)
app.get("/api/user-profiles", async (req, res) => {
  try {
    const { areaId } = req.query;
    const profiles = await storage.getUserProfiles({ 
      professionalAreaId: areaId ? parseInt(areaId as string) : undefined 
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profiles" });
  }
});

app.post("/api/user-profiles", async (req, res) => {
  try {
    const profile = await storage.createUserProfile(req.body);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user profile" });
  }
});

// Job Applications (Public routes)
app.get("/api/job-applications", async (req, res) => {
  try {
    const applications = await storage.getJobApplications();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job applications" });
  }
});

app.post("/api/job-applications", async (req, res) => {
  try {
    const application = await storage.createJobApplication(req.body);
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to create job application" });
  }
});

// ============= ADMIN ROUTES =============

// Admin - Job Applications Management
app.get("/api/admin/job-applications", async (req, res) => {
  try {
    const applications = await storage.getJobApplicationsWithDetails();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

app.post("/api/admin/job-applications/:id/review", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const application = await storage.reviewJobApplication(
      parseInt(id), 
      status, 
      notes,
      1 // reviewedBy userId - should come from auth
    );
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to review application" });
  }
});

// Admin - Jobs Management
app.get("/api/admin/jobs", async (req, res) => {
  try {
    const jobs = await storage.getJobsWithStats();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin jobs" });
  }
});

app.post("/api/admin/jobs/:id/toggle-status", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await storage.toggleJobStatus(parseInt(id));
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle job status" });
  }
});

app.delete("/api/admin/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await storage.deleteJob(parseInt(id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// Admin - User Profiles
app.get("/api/admin/user-profiles", async (req, res) => {
  try {
    const profiles = await storage.getUserProfilesWithStats();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profiles" });
  }
});

// Admin - Job Statistics
app.get("/api/admin/job-stats", async (req, res) => {
  try {
    const stats = await storage.getJobSystemStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job stats" });
  }
});

  const httpServer = createServer(app);

  return httpServer;
}
