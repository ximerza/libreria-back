import prisma from '../../infrastructure/db/prismaClient';
import { PasswordService } from '../../infrastructure/security/password.service';
import { JwtService } from '../../infrastructure/security/jwt.service';
import { RegisterUserInput, LoginUserInput } from '../dtos/auth.dto';

const passwordService = new PasswordService();
const jwtService = new JwtService();

export class AuthUseCases {
  async register(data: RegisterUserInput) {
    // Verificar si el email o username ya existen
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      throw new Error('El email o username ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await passwordService.hash(data.password);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    // Generar el token JWT
    const token = jwtService.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }

  async login(data: LoginUserInput) {
    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    // Comparar contraseñas
    const passwordMatch = await passwordService.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new Error('Credenciales incorrectas');
    }

    // Generar el token JWT
    const token = jwtService.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }
}
