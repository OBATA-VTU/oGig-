
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

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  bio?: string;
  institution?: string; // e.g., AAUA
  skills: string[];
  portfolioItems: { id: string; title: string; imageUrl: string }[];
  following: string[]; // List of UIDs
  followers: string[]; // List of UIDs
  // Employer Specific
  businessName?: string;
  businessAddress?: string;
  isLegallyRegistered?: boolean;
  contactPhone?: string;
  createdAt: string;
}

// Added AIProcessedJob interface for structured data returned by GenAI
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
  // Added optional fields used for branding and contact in the UI
  logo?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  link?: string;
}
