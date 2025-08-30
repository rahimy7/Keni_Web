import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Products schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  productId: varchar("product_id", { length: 10 }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  sales: integer("sales").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  productId: true,
  name: true,
  description: true,
  price: true,
  category: true,
  imageUrl: true,
  sales: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Orders schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 10 }).notNull(),
  userId: integer("user_id").notNull(),
  status: text("status").notNull(),
  total: text("total").notNull(),
  date: text("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  orderNumber: true,
  userId: true,
  status: true,
  total: true,
  date: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect & {
  customer: {
    name: string;
    avatarUrl: string;
  };
};

// Activities schema
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  message: text("message").notNull(),
  timeAgo: text("time_ago").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  type: true,
  message: true,
  timeAgo: true,
});

// Agregue estas tablas al archivo shared/schema.ts existente

// Professional Areas schema
export const professionalAreas = pgTable("professional_areas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProfessionalAreaSchema = createInsertSchema(professionalAreas).pick({
  name: true,
  description: true,
});

export type InsertProfessionalArea = z.infer<typeof insertProfessionalAreaSchema>;
export type ProfessionalArea = typeof professionalAreas.$inferSelect;

// User Profiles schema
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  professionalAreaId: integer("professional_area_id").references(() => professionalAreas.id),
  experience: text("experience"),
  skills: text("skills").array(),
  education: text("education"),
  summary: text("summary"),
  expectedSalary: text("expected_salary"),
  availableForWork: boolean("available_for_work").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).pick({
  userId: true,
  fullName: true,
  email: true,
  phone: true,
  professionalAreaId: true,
  experience: true,
  skills: true,
  education: true,
  summary: true,
  expectedSalary: true,
  availableForWork: true,
});

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;

// Jobs schema
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").array(),
  benefits: text("benefits").array(),
  professionalAreaId: integer("professional_area_id").references(() => professionalAreas.id),
  location: text("location"),
  jobType: text("job_type").notNull(), // full-time, part-time, contract, internship
  experienceLevel: text("experience_level").notNull(), // entry, mid, senior
  salaryRange: text("salary_range"),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  applicationDeadline: timestamp("application_deadline"),
  isActive: boolean("is_active").default(true),
  publishedBy: integer("published_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  title: true,
  company: true,
  description: true,
  requirements: true,
  benefits: true,
  professionalAreaId: true,
  location: true,
  jobType: true,
  experienceLevel: true,
  salaryRange: true,
  contactEmail: true,
  contactPhone: true,
  applicationDeadline: true,
  isActive: true,
  publishedBy: true,
});

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

// Job Applications schema
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id),
  userProfileId: integer("user_profile_id").notNull().references(() => userProfiles.id),
  coverLetter: text("cover_letter").notNull(),
  status: text("status").notNull().default("pending"), // pending, reviewed, accepted, rejected
  reviewedBy: integer("reviewed_by").references(() => users.id),
  reviewedAt: timestamp("reviewed_at"),
  notes: text("notes"), // Admin notes
  appliedAt: timestamp("applied_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).pick({
  jobId: true,
  userProfileId: true,
  coverLetter: true,
  status: true,
  reviewedBy: true,
  reviewedAt: true,
  notes: true,
});

export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

// Dashboard stats type (not stored in database, just for API response)
export type DashboardStats = {
  usersTotal: string;
  usersChange: number;
  ordersTotal: string;
  ordersChange: number;
  revenue: string;
  revenueChange: number;
  productsTotal: string;
  productsChange: number;
};
