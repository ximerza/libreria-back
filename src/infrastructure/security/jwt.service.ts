import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';

dotenv.config();

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export class JwtService {
  private readonly secret: string = process.env.JWT_SECRET || 'fallback-secret';
  private readonly expiresIn: string = process.env.JWT_EXPIRES_IN || '24h';

  sign(payload: JwtPayload): string {
    const options: SignOptions = { expiresIn: this.expiresIn };
    return jwt.sign(payload, this.secret, options);
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
