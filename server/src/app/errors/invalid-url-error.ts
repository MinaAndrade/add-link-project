import { AppError } from './app-error';

export class InvalidUrlError extends AppError {
  constructor() {
    super('Invalid URL', 400);
  }
}
