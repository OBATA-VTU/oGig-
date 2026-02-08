
export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  GIG = 'Gig',
  SERVICE = 'Service'
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements?: string;
  procedure?: string;
  location: string; // Format: "State, LGA/Area"
  type: JobType;
  category: string;
  salary?: string;
  postedAt: string;
  isAdminPosted: boolean;
  tags: string[];
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
  salary: string;
  tags: string[];
  whatsapp?: string;
  phone?: string;
  email?: string;
  link?: string;
}
