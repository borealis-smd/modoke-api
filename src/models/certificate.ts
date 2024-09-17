import { prisma } from "../config/db";
import { CertificateCreate } from "../validators/certificatesValidator";
import { MaxCertificatesReachedError } from "../errors/MaxCertificatesReachedError";
import { CertificateForSectionAlreadyExistsError } from "../errors/CertificateForSectionAlreadyExistsError";

export const getCertificateByUserId = async (user_id: string) => {
  return prisma.userHasCertificate.findMany({
    where: { user_id },
    include: { Certificate: true },
  });
};

// Apenas um para cada seção/nível: A, AA, AAA
export const createCertificate = async (certificate: CertificateCreate) => {
  const certificates = await prisma.certificate.findMany();
  if (certificates.length >= 3) {
    throw new MaxCertificatesReachedError(
      "Já existem certificados para todas as seções.",
    );
  }

  const certificateExists = certificates.some(
    (c) => c.section_id === certificate.section_id,
  );
  if (certificateExists) {
    throw new CertificateForSectionAlreadyExistsError(
      "Você não pode criar mais de um certificado para um seção.",
    );
  }

  return prisma.certificate.create({
    data: {
      certificate_text: certificate.certificate_text,
      section_id: certificate.section_id,
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
          section_id: true,
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
