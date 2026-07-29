import { notFound } from "next/navigation";

import CertificateForm from "@/components/certificate/CertificateForm";
import CertificateService from "@/services/CertificateService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCertificatePage({
  params,
}: Props) {
  const { id } = await params;

  const certificate =
    await CertificateService.getCertificate(id);

  if (!certificate) {
    notFound();
  }

  return (
    <CertificateForm
      mode="edit"
      initialData={JSON.parse(
        JSON.stringify(certificate)
      )}
    />
  );
}