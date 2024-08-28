import { prisma } from "../config/db";
import { CertificateCreate } from "../validators/certificatesValidator";
import { MaxCertificatesReachedError } from "../errors/MaxCertificatesReachedError";
import { CertificateForSessionAlreadyExistsError } from "../errors/CertificateForSessionAlreadyExistsError";

export const getCertificateByUserId = async (user_id: string) => {
  return prisma.userHasCertificate.findMany({
    where: { user_id },
    include: { Certificate: true },
  });
};

// Apenas um para cada sessão/nível: A, AA, AAA
export const createCertificate = async (certificate: CertificateCreate) => {
  const certificates = await prisma.certificates.findMany();
  if (certificates.length >= 3) {
    throw new MaxCertificatesReachedError(
      "Já existem certificados para todos os níveis",
    );
  }

  const certificateExists = certificates.some(
    (c) => c.session_id === certificate.session_id,
  );
  if (certificateExists) {
    throw new CertificateForSessionAlreadyExistsError(
      "Já existe um certificado para essa sessão",
    );
  }

  return prisma.certificates.create({
    data: {
      certificate_text: certificate.certificate_text,
      session_id: certificate.session_id,
    },
  });
};

export const assignCertificateToUser = async (
  user_id: string,
  certificate_id: number,
) => {
  return prisma.userHasCertificate.create({
    data: {
      user_id,
      certificate_id,
    },
    include: {
      Certificate: {
        select: {
          certificate_text: true,
          session_id: true,
        },
      },
      User: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });
};
