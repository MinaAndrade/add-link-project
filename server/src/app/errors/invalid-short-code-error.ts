import { AppError } from './app-error';

export class InvalidShortCodeError extends AppError {
  constructor() {
    super('Short code is invalid', 400);
  }
}
