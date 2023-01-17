export class AppError {
  public name: string;
  public message: string;
  public code: number | undefined;

  constructor(message: string, code?: number) {
    this.name = "AppError";
    this.message = message;
    this.code = code || 400;
  }
}
