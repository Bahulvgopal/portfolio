import Certificate, {
  ICertificate,
} from "@/models/Certificate";
import { BaseRepository } from "./BaseRepository";
import type { Certificate as CertificateType } from "@/types/certificate";

class CertificateRepository extends BaseRepository<ICertificate> {
  constructor() {
    super(Certificate);
  }


async getPublishedCertificates(): Promise<CertificateType[]> {
  const certificates = await this.model
    .find({ status: "published" })
    .sort({
      order: 1,
      issueDate: -1,
    })
    .lean();

  return certificates.map((c) => ({
    _id: c._id.toString(),
    title: c.title,
    issuer: c.issuer,
    credentialId: c.credentialId,
    credentialUrl: c.credentialUrl,
    issueDate: c.issueDate.toISOString(),
    expiryDate: c.expiryDate?.toISOString(),
    doesNotExpire: c.doesNotExpire,
    description: c.description,
    skills: c.skills,
    logo: c.logo
  ? {
      url: c.logo.url ?? "",
      publicId: c.logo.publicId ?? "",
    }
  : undefined,
    order: c.order,
    status: c.status,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));
}
}

export default new CertificateRepository();