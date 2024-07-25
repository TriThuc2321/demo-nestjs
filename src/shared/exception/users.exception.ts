import { ConflictException, NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('User not found', error);
  }
}

export class UserExistException extends ConflictException {
  constructor(error?: string) {
    super('User already exists', error);
  }
}
