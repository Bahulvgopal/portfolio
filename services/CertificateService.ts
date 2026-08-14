import cloudinary from "@/lib/cloudinary";

import CertificateRepository from "@/repositories/CertificateRepository";
import type { Certificate } from "@/types/certificate";
import type { CertificateApiData } from "@/schemas/certificateApiSchema";
import type { UpdateCertificateApiData } from "@/schemas/certificateApiSchema";

class CertificateService {
 async createCertificate(
    data: CertificateApiData
){
  return CertificateRepository.create({
    ...data,
    issueDate: new Date(data.issueDate),
    expiryDate: data.expiryDate
      ? new Date(data.expiryDate)
      : undefined,
    skills: data.skills,
  });
}

  async getCertificates() {
    return CertificateRepository.findAll();
  }

  async getPublishedCertificates(): Promise<Certificate[]> {
  return (await CertificateRepository.getPublishedCertificates()) as Certificate[];
}

  async getCertificate(id: string) {
    return CertificateRepository.findById(id);
  }

  async updateCertificate(
  id: string,
  data: UpdateCertificateApiData
) {
    const certificate =
      await CertificateRepository.findById(id);

    if (!certificate) {
      return null;
    }

    if (
      data.logo?.publicId &&
      certificate.logo?.publicId &&
      data.logo.publicId !==
        certificate.logo.publicId
    ) {
      await cloudinary.uploader.destroy(
        certificate.logo.publicId
      );
    }

   return CertificateRepository.update(id, {
  ...data,
  issueDate: data.issueDate
    ? new Date(data.issueDate)
    : undefined,
  expiryDate: data.expiryDate
    ? new Date(data.expiryDate)
    : undefined,
  skills: data.skills,
});
  }

  async deleteCertificate(id: string) {
    const certificate =
      await CertificateRepository.findById(id);

    if (!certificate) {
      return null;
    }

    if (certificate.logo?.publicId) {
      await cloudinary.uploader.destroy(
        certificate.logo.publicId
      );
    }

    return CertificateRepository.delete(id);
  }
}

export default new CertificateService();