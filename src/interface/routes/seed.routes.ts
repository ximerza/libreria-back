import express from 'express';
import { prisma } from '../../infrastructure/db/prismaClient';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Eliminar datos existentes
    await prisma.post.deleteMany();
    await prisma.clubMember.deleteMany();
    await prisma.club.deleteMany();
    await prisma.reading.deleteMany();
    await prisma.book.deleteMany();

    // Crear libros de prueba
    await prisma.book.createMany({
      data: [
        {
          title: 'Cien años de soledad',
          author: 'Gabriel García Márquez',
          description: 'Una obra maestra de la literatura latinoamericana',
          coverUrl: 'https://covers.openlibrary.org/b/id/8227901-M.jpg',
          publishYear: 1967
        },
        {
          title: '1984',
          author: 'George Orwell',
          description: 'Una distopía clásica sobre el totalitarismo',
          coverUrl: 'https://covers.openlibrary.org/b/id/8232436-M.jpg',
          publishYear: 1949
        },
        {
          title: 'El principito',
          author: 'Antoine de Saint-Exupéry',
          description: 'Una historia filosófica y poética',
          coverUrl: 'https://covers.openlibrary.org/b/id/10410624-M.jpg',
          publishYear: 1943
        },
        {
          title: 'Crónica de una muerte anunciada',
          author: 'Gabriel García Márquez',
          description: 'Una novela sobre el honor y la fatalidad',
          coverUrl: 'https://covers.openlibrary.org/b/id/9269979-M.jpg',
          publishYear: 1981
        }
      ]
    });

    // Obtener los libros creados
    const books = await prisma.book.findMany();

    // Crear clubs de prueba sin relaciones de usuario por ahora
    await prisma.club.createMany({
      data: [
        {
          name: 'Amantes de la Literatura Latinoamericana',
          description: 'Un espacio para debatir y descubrir autores como García Márquez, Isabel Allende y más.',
          imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
          isPublic: true,
          creatorId: 'temp'
        },
        {
          name: 'Club de Ciencia Ficción y Fantasía',
          description: 'Exploramos universos distópicos, magia y mundos alternativos.',
          imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
          isPublic: true,
          creatorId: 'temp'
        },
        {
          name: 'Lectores de Clásicos',
          description: 'Damos vida a los grandes autores: Austen, Dostoievski, Hemingway y más.',
          imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
          isPublic: true,
          creatorId: 'temp'
        }
      ]
    });

    // Obtener clubs creados
    const clubs = await prisma.club.findMany();

    res.status(201).json({
      status: 'success',
      message: 'Base de datos poblada con datos de prueba',
      data: {
        clubs,
        books
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error al poblar la base de datos'
    });
  }
});

export default router;
