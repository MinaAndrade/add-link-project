import { AppError } from './app-error';

export class ShortCodeAlreadyExistsError extends AppError {
  constructor() {
    super('Short code already exists', 409);
  }
}
