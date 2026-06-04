import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../src/interface/routes/auth.routes';
import bookRoutes from '../src/interface/routes/book.routes';
import clubRoutes from '../src/interface/routes/club.routes';
import seedRoutes from '../src/interface/routes/seed.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/clubs', clubRoutes);
app.use('/api/v1/seed', seedRoutes);

// Ruta de prueba
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API funcionando correctamente!' });
});

export default app;
