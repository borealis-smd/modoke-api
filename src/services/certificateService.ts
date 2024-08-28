import * as CertificateRepo from "../models/certificate";
import { CertificateCreate } from "../validators/certificatesValidator";

export const getCertificatesByUserId = async (user_id: string) => {
  return CertificateRepo.getCertificateByUserId(user_id);
};

export const createCertificate = async (certificate: CertificateCreate) => {
  return CertificateRepo.createCertificate(certificate);
};

export const assignCertificateToUser = async (
  user_id: string,
  certificate_id: number,
) => {
  return CertificateRepo.assignCertificateToUser(user_id, certificate_id);
};
