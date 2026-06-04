import prisma from '../../infrastructure/db/prismaClient';
import { CreateBookInput, UpdateBookInput } from '../dtos/book.dto';

export class BookUseCases {
  // Obtener todos los libros con paginación
  async getBooks(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.book.count(),
    ]);

    return {
      data: books,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Obtener un libro por ID
  async getBookById(id: string) {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new Error('Libro no encontrado');
    }
    return book;
  }

  // Crear un libro
  async createBook(data: CreateBookInput) {
    return prisma.book.create({ data });
  }

  // Actualizar un libro
  async updateBook(id: string, data: UpdateBookInput) {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new Error('Libro no encontrado');
    }
    return prisma.book.update({ where: { id }, data });
  }

  // Eliminar un libro
  async deleteBook(id: string) {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new Error('Libro no encontrado');
    }
    return prisma.book.delete({ where: { id } });
  }
}
