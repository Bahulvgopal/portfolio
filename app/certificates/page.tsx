import { getCertificates } from "@/lib/api/certificates";
import CertificatesPage from "@/components/CertificatesPage";

export default async function Page() {
  const certificates = await getCertificates();

  return <CertificatesPage certificates={certificates} />;
}