import { 
  users, 
  type User, 
  type InsertUser, 
  Product, 
  Order, 
  Activity,
  DashboardStats,
  JobApplication,
  InsertJob,
  InsertJobApplication,
  InsertProfessionalArea,
  InsertUserProfile,
  Job,
  ProfessionalArea,
  UserProfile
} from "@shared/schema";

// ============= INTERFACES AND TYPES =============

export interface JobFilters {
  professionalAreaId?: number;
  isActive?: boolean;
  jobType?: string;
  experienceLevel?: string;
}

export interface UserProfileFilters {
  professionalAreaId?: number;
  availableForWork?: boolean;
}

export interface JobSystemStats {
  totalJobs: number;
  jobsThisMonth: number;
  totalApplications: number;
  applicationsThisWeek: number;
  activeProfiles: number;
  profilesAvailable: number;
  successRate: string;
}

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

  // Professional Areas
  getProfessionalAreas(): Promise<ProfessionalArea[]>;
  createProfessionalArea(area: InsertProfessionalArea): Promise<ProfessionalArea>;

  // Jobs
  getJobs(filters?: JobFilters): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  getJobsWithStats(): Promise<Job[]>;
  toggleJobStatus(jobId: number): Promise<Job>;
  deleteJob(jobId: number): Promise<void>;

  // User Profiles
  getUserProfiles(filters?: UserProfileFilters): Promise<UserProfile[]>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  getUserProfilesWithStats(): Promise<UserProfile[]>;

  // Job Applications
  getJobApplications(): Promise<JobApplication[]>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getJobApplicationsWithDetails(): Promise<any[]>;
  reviewJobApplication(id: number, status: string, notes?: string, reviewedBy?: number): Promise<JobApplication>;

  // System Stats
  getJobSystemStats(): Promise<JobSystemStats>;
}

// ============= MEMORY STORAGE IMPLEMENTATION =============

export class MemStorage implements IStorage {
  // Core system maps
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private activities: Map<number, Activity>;
  
  // Jobs system maps
  private professionalAreas: Map<number, ProfessionalArea>;
  private jobs: Map<number, Job>;
  private userProfiles: Map<number, UserProfile>;
  private jobApplications: Map<number, JobApplication>;

  currentId: number;

  constructor() {
    // Initialize all maps
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.activities = new Map();
    this.professionalAreas = new Map();
    this.jobs = new Map();
    this.userProfiles = new Map();
    this.jobApplications = new Map();
    
    this.currentId = 1;
    
    // Initialize sample data
    this.initializeSampleData();
    this.initializeJobsSampleData();
  }

  // ============= USER OPERATIONS =============

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
  const user: User = { 
    ...insertUser, 
    id, 
    email: insertUser.email ?? null, // Convierte undefined a null
    role: insertUser.role ?? null,   // Convierte undefined a null
    createdAt: new Date() 
  };
  this.users.set(id, user);
  return user;
}
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // ============= PRODUCT OPERATIONS =============
  
  async getTopSellingProducts(): Promise<Product[]> {
    const products = Array.from(this.products.values());
    return products.sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 3);
  }
  
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  // ============= ORDER OPERATIONS =============
  
async getRecentOrders(): Promise<Order[]> {
  const orders = Array.from(this.orders.values());
  return orders.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  }).slice(0, 4);
}
  
  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  // ============= ACTIVITY OPERATIONS =============
  
  async getRecentActivities(): Promise<Activity[]> {
  const activities = Array.from(this.activities.values());
  return activities.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  }).slice(0, 4);
}

  // ============= DASHBOARD STATS =============
  
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

  // ============= PROFESSIONAL AREAS =============

  async getProfessionalAreas(): Promise<ProfessionalArea[]> {
    return Array.from(this.professionalAreas.values());
  }

  async createProfessionalArea(insertArea: InsertProfessionalArea): Promise<ProfessionalArea> {
  const id = this.currentId++;
  const area: ProfessionalArea = { 
    ...insertArea,
    id,
    description: insertArea.description ?? null,
    createdAt: new Date() 
  };
  this.professionalAreas.set(id, area);
  return area;
}
  // ============= JOBS =============

  async getJobs(filters?: JobFilters): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values());

    if (filters) {
      if (filters.professionalAreaId) {
        jobs = jobs.filter(job => job.professionalAreaId === filters.professionalAreaId);
      }
      if (filters.isActive !== undefined) {
        jobs = jobs.filter(job => job.isActive === filters.isActive);
      }
      if (filters.jobType) {
        jobs = jobs.filter(job => job.jobType === filters.jobType);
      }
      if (filters.experienceLevel) {
        jobs = jobs.filter(job => job.experienceLevel === filters.experienceLevel);
      }
    }

   return jobs.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
  }

async createJob(insertJob: InsertJob): Promise<Job> {
  const id = this.currentId++;
  const job: Job = { 
    ...insertJob,
    id,
    requirements: insertJob.requirements ?? null,
    benefits: insertJob.benefits ?? null,
    professionalAreaId: insertJob.professionalAreaId ?? null,
    location: insertJob.location ?? null,
    salaryRange: insertJob.salaryRange ?? null,
    contactPhone: insertJob.contactPhone ?? null,
    applicationDeadline: insertJob.applicationDeadline ?? null,
    isActive: insertJob.isActive ?? true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  this.jobs.set(id, job);
  return job;
}

async getJobsWithStats(): Promise<Job[]> {
  const jobs = Array.from(this.jobs.values());
  return jobs.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
}

  async toggleJobStatus(jobId: number): Promise<Job> {
    const job = this.jobs.get(jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    
    const updatedJob = { 
      ...job, 
      isActive: !job.isActive, 
      updatedAt: new Date() 
    };
    this.jobs.set(jobId, updatedJob);
    return updatedJob;
  }

  async deleteJob(jobId: number): Promise<void> {
    // Remove related applications first
    const relatedApplications = Array.from(this.jobApplications.entries())
      .filter(([_, app]) => app.jobId === jobId);
    
    relatedApplications.forEach(([appId]) => {
      this.jobApplications.delete(appId);
    });

    this.jobs.delete(jobId);
  }

  // ============= USER PROFILES =============

  async getUserProfiles(filters?: UserProfileFilters): Promise<UserProfile[]> {
    let profiles = Array.from(this.userProfiles.values());

    if (filters) {
      if (filters.professionalAreaId) {
        profiles = profiles.filter(profile => 
          profile.professionalAreaId === filters.professionalAreaId
        );
      }
      if (filters.availableForWork !== undefined) {
        profiles = profiles.filter(profile => 
          profile.availableForWork === filters.availableForWork
        );
      }
    }

   return profiles.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
  }
async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
  const id = this.currentId++;
  const profile: UserProfile = { 
    ...insertProfile,
    id,
    phone: insertProfile.phone ?? null,
    professionalAreaId: insertProfile.professionalAreaId ?? null,
    experience: insertProfile.experience ?? null,
    skills: insertProfile.skills ?? null,
    education: insertProfile.education ?? null,
    summary: insertProfile.summary ?? null,
    expectedSalary: insertProfile.expectedSalary ?? null,
    availableForWork: insertProfile.availableForWork ?? true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  this.userProfiles.set(id, profile);
  return profile;
}


 async getUserProfilesWithStats(): Promise<UserProfile[]> {
  return Array.from(this.userProfiles.values()).sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
}

  // ============= JOB APPLICATIONS =============

  async getJobApplications(): Promise<JobApplication[]> {
  return Array.from(this.jobApplications.values()).sort((a, b) => {
    const dateA = (a.appliedAt || a.createdAt) ? new Date(a.appliedAt || a.createdAt!).getTime() : 0;
    const dateB = (b.appliedAt || b.createdAt) ? new Date(b.appliedAt || b.createdAt!).getTime() : 0;
    return dateB - dateA;
  });
}

async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
  const id = this.currentId++;
  const application: JobApplication = { 
    ...insertApplication,
    id,
    jobId: insertApplication.jobId ?? null,
    status: insertApplication.status || "pending",
    reviewedBy: insertApplication.reviewedBy ?? null,
    reviewedAt: insertApplication.reviewedAt ?? null,
    notes: insertApplication.notes ?? null,
    appliedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  this.jobApplications.set(id, application);
  return application;
}

 async getJobApplicationsWithDetails(): Promise<any[]> {
  const applications = Array.from(this.jobApplications.values());
  const jobs = Array.from(this.jobs.values());
  const profiles = Array.from(this.userProfiles.values());

  return applications.map(app => ({
    ...app,
    job: app.jobId ? jobs.find(j => j.id === app.jobId) : null,
    profile: profiles.find(p => p.id === app.userProfileId),
  })).sort((a, b) => {
    const dateA = (a.appliedAt || a.createdAt) ? new Date(a.appliedAt || a.createdAt!).getTime() : 0;
    const dateB = (b.appliedAt || b.createdAt) ? new Date(b.appliedAt || b.createdAt!).getTime() : 0;
    return dateB - dateA;
  });
}

async reviewJobApplication(
  id: number, 
  status: string, 
  notes?: string, 
  reviewedBy?: number
): Promise<JobApplication> {
  const application = this.jobApplications.get(id);
  if (!application) {
    throw new Error("Application not found");
  }

  const updatedApplication = {
    ...application,
    status,
    notes: notes ?? null,
    reviewedBy: reviewedBy ?? null,
    reviewedAt: new Date(),
    updatedAt: new Date()
  };

  this.jobApplications.set(id, updatedApplication);
  return updatedApplication;
}

  // ============= SYSTEM STATS =============

async getJobSystemStats(): Promise<JobSystemStats> {
  const jobs = Array.from(this.jobs.values());
  const applications = Array.from(this.jobApplications.values());
  const profiles = Array.from(this.userProfiles.values());

  const now = new Date();
  const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const jobsThisMonth = jobs.filter(job => 
    job.createdAt && new Date(job.createdAt) >= monthAgo
  ).length;

  const applicationsThisWeek = applications.filter(app => {
    const date = app.appliedAt || app.createdAt;
    return date && new Date(date) >= weekAgo;
  }).length;

  const activeProfiles = profiles.length;
  const profilesAvailable = profiles.filter(p => p.availableForWork).length;

  const acceptedApplications = applications.filter(app => app.status === "accepted").length;
  const successRate = applications.length > 0 
    ? ((acceptedApplications / applications.length) * 100).toFixed(1)
    : "0";

  return {
    totalJobs: jobs.length,
    jobsThisMonth,
    totalApplications: applications.length,
    applicationsThisWeek,
    activeProfiles,
    profilesAvailable,
    successRate
  };
}

  // ============= SAMPLE DATA INITIALIZATION =============

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

  private initializeJobsSampleData() {
    // Professional Areas
    const areas = [
      { id: 1, name: "Tecnología", description: "Desarrollo de software, IT, sistemas" },
      { id: 2, name: "Marketing", description: "Marketing digital, publicidad, ventas" },
      { id: 3, name: "Finanzas", description: "Contabilidad, análisis financiero, banca" },
      { id: 4, name: "Recursos Humanos", description: "Gestión de talento, reclutamiento" },
      { id: 5, name: "Diseño", description: "Diseño gráfico, UX/UI, creatividad" },
    ];

    areas.forEach(area => {
      this.professionalAreas.set(area.id, {
        ...area,
        createdAt: new Date()
      });
    });

    // Sample Jobs
    const sampleJobs = [
      {
        id: 1,
        title: "Desarrollador Frontend React",
        company: "TechCorp",
        description: "Buscamos un desarrollador frontend con experiencia en React y TypeScript para unirse a nuestro equipo de desarrollo de productos.",
        requirements: ["React", "TypeScript", "CSS", "Git"],
        benefits: ["Trabajo remoto", "Seguro médico", "Capacitaciones"],
        professionalAreaId: 1,
        location: "Santo Domingo, RD",
        jobType: "full-time",
        experienceLevel: "mid",
        salaryRange: "$35,000 - $45,000",
        contactEmail: "reclutamiento@techcorp.com",
        contactPhone: "809-555-0123",
        applicationDeadline: null,
        isActive: true,
        publishedBy: 1,
        createdAt: new Date(2024, 7, 15),
        updatedAt: new Date(2024, 7, 15)
      },
      {
        id: 2,
        title: "Especialista en Marketing Digital",
        company: "MarketPro",
        description: "Buscamos un especialista en marketing digital para gestionar nuestras campañas en redes sociales y SEO.",
        requirements: ["Google Ads", "Facebook Ads", "SEO", "Analytics"],
        benefits: ["Horario flexible", "Bonos por rendimiento"],
        professionalAreaId: 2,
        location: "Santiago, RD",
        jobType: "full-time",
        experienceLevel: "entry",
        salaryRange: "$25,000 - $32,000",
        contactEmail: "jobs@marketpro.com",
        contactPhone: null,
        applicationDeadline: null,
        isActive: true,
        publishedBy: 1,
        createdAt: new Date(2024, 7, 20),
        updatedAt: new Date(2024, 7, 20)
      },
      {
        id: 3,
        title: "Diseñador UX/UI",
        company: "DesignStudio",
        description: "Únete a nuestro equipo creativo como diseñador UX/UI para crear experiencias digitales excepcionales.",
        requirements: ["Figma", "Adobe XD", "Prototipado", "User Research"],
        benefits: ["Ambiente creativo", "Proyectos internacionales", "Crecimiento profesional"],
        professionalAreaId: 5,
        location: "Santo Domingo, RD",
        jobType: "full-time",
        experienceLevel: "senior",
        salaryRange: "$40,000 - $55,000",
        contactEmail: "careers@designstudio.com",
        contactPhone: "809-555-0456",
        applicationDeadline: null,
        isActive: true,
        publishedBy: 1,
        createdAt: new Date(2024, 7, 25),
        updatedAt: new Date(2024, 7, 25)
      }
    ];

    sampleJobs.forEach(job => {
      this.jobs.set(job.id, job);
    });

    // Sample User Profiles
    const sampleProfiles = [
      {
        id: 1,
        userId: 2,
        fullName: "María González",
        email: "maria.gonzalez@ejemplo.com",
        phone: "809-555-1234",
        professionalAreaId: 1,
        experience: "3 años de experiencia en desarrollo frontend con React y Vue.js. He trabajado en proyectos de e-commerce y aplicaciones web corporativas.",
        skills: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML", "CSS", "Git"],
        education: "Ingeniería en Sistemas, PUCMM",
        summary: "Desarrolladora frontend apasionada por crear interfaces de usuario intuitivas y responsivas. Me especializo en React y tengo experiencia trabajando en equipos ágiles.",
        expectedSalary: "$30,000 - $40,000",
        availableForWork: true,
        createdAt: new Date(2024, 7, 10),
        updatedAt: new Date(2024, 7, 10)
      },
      {
        id: 2,
        userId: 1,
        fullName: "Juan Pérez",
        email: "juan.perez@ejemplo.com",
        phone: "809-555-5678",
        professionalAreaId: 2,
        experience: "5 años en marketing digital, especializado en Google Ads y Facebook Ads. He gestionado presupuestos de hasta $50,000 mensuales.",
        skills: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Marketing Automation"],
        education: "Licenciatura en Marketing, UASD",
        summary: "Especialista en marketing digital con track record comprobado en generación de leads y optimización de ROI en campañas publicitarias digitales.",
        expectedSalary: "$35,000 - $45,000",
        availableForWork: true,
        createdAt: new Date(2024, 7, 12),
        updatedAt: new Date(2024, 7, 12)
      }
    ];

    sampleProfiles.forEach(profile => {
      this.userProfiles.set(profile.id, profile);
    });

    // Sample Job Applications
    const sampleApplications = [
      {
        id: 1,
        jobId: 1,
        userProfileId: 1,
        coverLetter: "Estimado equipo de reclutamiento, estoy muy interesada en la posición de Desarrollador Frontend React. Mi experiencia de 3 años con React y TypeScript me ha permitido desarrollar aplicaciones web robustas y escalables. He trabajado en proyectos similares y estoy emocionada por la oportunidad de contribuir a TechCorp.",
        status: "pending",
        reviewedBy: null,
        reviewedAt: null,
        notes: null,
        appliedAt: new Date(2024, 7, 28),
        createdAt: new Date(2024, 7, 28),
        updatedAt: new Date(2024, 7, 28)
      },
      {
        id: 2,
        jobId: 2,
        userProfileId: 2,
        coverLetter: "Hola equipo de MarketPro, soy Juan Pérez y me postulo para la posición de Especialista en Marketing Digital. Con 5 años de experiencia gestionando campañas de Google Ads y Facebook Ads, he logrado optimizar ROI en más del 150% en mis proyectos anteriores. Me encantaría aportar mi experiencia a su equipo.",
        status: "reviewed",
        reviewedBy: 1,
        reviewedAt: new Date(2024, 7, 29),
        notes: "Candidato prometedor con buena experiencia. Programar entrevista.",
        appliedAt: new Date(2024, 7, 26),
        createdAt: new Date(2024, 7, 26),
        updatedAt: new Date(2024, 7, 29)
      },
      {
        id: 3,
        jobId: 3,
        userProfileId: 1,
        coverLetter: "Aunque mi experiencia principal es en desarrollo frontend, tengo un gran interés en UX/UI y he completado varios cursos en Figma y diseño centrado en el usuario. Me gustaría hacer la transición al área de diseño y creo que mi background técnico sería un valor agregado.",
        status: "rejected",
        reviewedBy: 1,
        reviewedAt: new Date(2024, 7, 30),
        notes: "Perfil interesante pero buscamos alguien con más experiencia específica en UX/UI.",
        appliedAt: new Date(2024, 7, 27),
        createdAt: new Date(2024, 7, 27),
        updatedAt: new Date(2024, 7, 30)
      },
      {
        id: 4,
        jobId: null, // Postulación general
        userProfileId: 2,
        coverLetter: "Hola, soy Juan Pérez, especialista en marketing digital con 5 años de experiencia. Estoy abierto a nuevas oportunidades en el área de marketing y publicidad digital. Mi experiencia incluye gestión de campañas, SEO y analytics. Estaría encantado de discutir cómo puedo aportar valor a su organización.",
        status: "pending",
        reviewedBy: null,
        reviewedAt: null,
        notes: null,
        appliedAt: new Date(2024, 7, 30),
        createdAt: new Date(2024, 7, 30),
        updatedAt: new Date(2024, 7, 30)
      }
    ];

    sampleApplications.forEach(application => {
      this.jobApplications.set(application.id, application);
    });

    // Increment currentId to avoid conflicts
    this.currentId = Math.max(
      Math.max(...Array.from(this.users.keys()), 0),
      Math.max(...Array.from(this.products.keys()), 0),
      Math.max(...Array.from(this.orders.keys()), 0),
      Math.max(...Array.from(this.activities.keys()), 0),
      Math.max(...Array.from(this.professionalAreas.keys()), 0),
      Math.max(...Array.from(this.jobs.keys()), 0),
      Math.max(...Array.from(this.userProfiles.keys()), 0),
      Math.max(...Array.from(this.jobApplications.keys()), 0),
      this.currentId
    ) + 1;
  }
}

// Export the storage instance
export const storage = new MemStorage();