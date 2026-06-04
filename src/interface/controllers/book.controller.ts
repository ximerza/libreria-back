import { Request, Response } from 'express';
import { BookUseCases } from '../../application/usecases/book.usecase';
import { CreateBookDto, UpdateBookDto } from '../../application/dtos/book.dto';
import { AuthRequest } from '../middlewares/auth.middleware';

const bookUseCases = new BookUseCases();

export class BookController {
  async getBooks(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await bookUseCases.getBooks(page, limit);
      
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener los libros', error: error.message });
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await bookUseCases.getBookById(id);
      
      res.status(200).json({ data: book });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async createBook(req: AuthRequest, res: Response) {
    try {
      const validatedData = CreateBookDto.parse(req.body);
      const book = await bookUseCases.createBook(validatedData);
      
      res.status(201).json({ message: 'Libro creado exitosamente', data: book });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: 'Error de validación', errors: error.errors });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async updateBook(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = UpdateBookDto.parse(req.body);
      
      const book = await bookUseCases.updateBook(id, validatedData);
      
      res.status(200).json({ message: 'Libro actualizado exitosamente', data: book });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: 'Error de validación', errors: error.errors });
      }
      res.status(error.message === 'Libro no encontrado' ? 404 : 400).json({ message: error.message });
    }
  }

  async deleteBook(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await bookUseCases.deleteBook(id);
      
      res.status(200).json({ message: 'Libro eliminado exitosamente' });
    } catch (error: any) {
      res.status(error.message === 'Libro no encontrado' ? 404 : 400).json({ message: error.message });
    }
  }
}
