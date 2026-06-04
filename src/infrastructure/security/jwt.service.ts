import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export class JwtService {
  private readonly secret = process.env.JWT_SECRET || 'fallback-secret';
  private readonly expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
