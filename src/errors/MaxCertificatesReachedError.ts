export class MaxCertificatesReachedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MaxCertificatesReachedError";
  }
}
