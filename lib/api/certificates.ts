import CertificateService from "@/services/CertificateService";
import type { Certificate } from "@/types/certificate";

export async function getCertificates(): Promise<Certificate[]> {
  return (await CertificateService.getPublishedCertificates()) as Certificate[];
}