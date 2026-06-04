import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const bookController = new BookController();

// Rutas públicas
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

// Rutas protegidas (requieren autenticación)
router.post('/', authMiddleware, bookController.createBook);
router.put('/:id', authMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);

export default router;
