import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../infrastructure/security/jwt.service';

const jwtService = new JwtService();

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwtService.verify(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Middleware para verificar rol de ADMIN
export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
  }
  next();
};
