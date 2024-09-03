export class CertificateForSectionAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CertificateForSectionAlreadyExistsError";
  }
}
