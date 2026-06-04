import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './interface/routes/auth.routes';
import bookRoutes from './interface/routes/book.routes';
import clubRoutes from './interface/routes/club.routes';
import seedRoutes from './interface/routes/seed.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

// Para Vercel
module.exports = app;

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`✅ Ruta de prueba: http://localhost:${PORT}/api/v1/health`);
    console.log(`✅ Rutas de auth: /api/v1/auth/register y /api/v1/auth/login`);
    console.log(`✅ Rutas de books: /api/v1/books`);
    console.log(`✅ Rutas de clubs: /api/v1/clubs`);
    console.log(`✅ Ruta de seed: /api/v1/seed (para poblar datos de prueba)`);
  });
}
