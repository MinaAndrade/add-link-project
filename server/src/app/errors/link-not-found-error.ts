import { AppError } from './app-error';

export class LinkNotFoundError extends AppError {
  constructor() {
    super('Link not found', 404);
  }
}
