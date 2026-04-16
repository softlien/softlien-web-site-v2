export interface ProposalFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  details: string;
}

export interface ProposalSubmission extends ProposalFormData {
  _id?: string;
  proposalFileUrl?: string;
  createdAt: Date;
  read?: boolean;
  status?: 'pending' | 'reviewed' | 'contacted';
}

export const SERVICE_OPTIONS = [
  { value: "", label: "Select a service" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-apps", label: "Mobile App Development" },
  { value: "cloud-solutions", label: "Cloud Solutions" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "", label: "Select budget range" },
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-30k", label: "$15,000 - $30,000" },
  { value: "30k-50k", label: "$30,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "over-100k", label: "Over $100,000" },
  { value: "not-sure", label: "Not sure yet" },
] as const;
