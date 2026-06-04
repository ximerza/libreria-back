import { z } from 'zod';

// Esquema para el registro de usuario
export const RegisterUserDto = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  username: z.string().min(3, 'El username debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Esquema para el login
export const LoginUserDto = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Tipos inferidos de los esquemas
export type RegisterUserInput = z.infer<typeof RegisterUserDto>;
export type LoginUserInput = z.infer<typeof LoginUserDto>;
