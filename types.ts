
export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  GIG = 'Gig',
  SERVICE = 'Service'
}

export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  EMPLOYER = 'EMPLOYER',
  ADMIN = 'ADMIN'
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  bio?: string;
  institution?: string; // e.g., AAUA
  skills: string[];
  portfolioItems: PortfolioItem[];
  following: string[]; // List of UIDs
  followers: string[]; // List of UIDs
  // Employer Specific
  businessName?: string;
  businessAddress?: string;
  isLegallyRegistered?: boolean;
  contactPhone?: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements?: string;
  procedure?: string;
  location: string;
  type: JobType;
  category: string;
  salary?: string;
  postedAt: string;
  isAdminPosted: boolean;
  tags: string[];
  creatorId: string;
  logo?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  link?: string;
}

export interface AIProcessedJob {
  title: string;
  company: string;
  description: string;
  requirements: string;
  procedure: string;
  location: string;
  type: JobType;
  category: string;
  salary?: string;
  tags: string[];
  whatsapp?: string;
  phone?: string;
  email?: string;
  link?: string;
}
