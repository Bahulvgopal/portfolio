export interface CertificateLogo {
  url: string;
  publicId: string;
}

export type CertificateStatus =
  | "published"
  | "draft";

export interface Certificate {
  _id: string;

  title: string;
  issuer: string;

  credentialId?: string;
  credentialUrl?: string;

  issueDate: string;
  expiryDate?: string;
  doesNotExpire: boolean;

  description?: string;

  skills: string[];

  logo?: CertificateLogo;

  order: number;

  status: CertificateStatus;

  createdAt: string;
  updatedAt: string;
}