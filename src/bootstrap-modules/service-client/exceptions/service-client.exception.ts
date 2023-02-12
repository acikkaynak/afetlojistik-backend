export class ServiceClientException extends Error {
  constructor(
    public readonly microservice: string,
    public readonly message: string,
    public readonly code: number,
    public readonly data: any,
    public readonly isMicroservice: boolean = true,
  ) {
    super(message);
  }
}
