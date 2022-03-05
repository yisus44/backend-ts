import { Request } from 'express';

export interface createUserBody extends Request {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  secondLastName?: string;
  birthDate: Date;
}

export interface updateUserBody extends Request {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
}
