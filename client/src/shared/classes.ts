import {type IErrorOptions} from "./types";

export class ApiError extends Error {
  // Constructor overload signatures
  constructor(message: string);
  constructor(message: string, options?: IErrorOptions);

  // Constructor implementation
  constructor(message: string, options?: IErrorOptions) {
    super(message);
    if (options?.cause) {
      (this as any).cause = options.cause;
    }
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
