import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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
  });
}
