export class CertificateForSessionAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CertificateForSessionAlreadyExistsError";
  }
}
