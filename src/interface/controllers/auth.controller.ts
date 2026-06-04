import { Request, Response } from 'express';
import { AuthUseCases } from '../../application/usecases/auth.usecase';
import { RegisterUserDto, LoginUserDto } from '../../application/dtos/auth.dto';

const authUseCases = new AuthUseCases();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      // Validar el body usando Zod
      const validatedData = RegisterUserDto.parse(req.body);
      
      const result = await authUseCases.register(validatedData);
      
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        data: result,
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          message: 'Error de validación',
          errors: error.errors,
        });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = LoginUserDto.parse(req.body);
      
      const result = await authUseCases.login(validatedData);
      
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        data: result,
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          message: 'Error de validación',
          errors: error.errors,
        });
      }
      res.status(400).json({ message: error.message });
    }
  }
}
