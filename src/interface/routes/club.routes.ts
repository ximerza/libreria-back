
import express from 'express';
import { getAllClubs, getClubById, createClub, joinClub, createPost, addReading, getMyReadings } from '../controllers/club.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', getAllClubs);
router.get('/:id', getClubById);
router.post('/', authMiddleware, createClub);
router.post('/:clubId/join', authMiddleware, joinClub);
router.post('/:clubId/posts', authMiddleware, createPost);

router.post('/readings', authMiddleware, addReading);
router.get('/readings/me', authMiddleware, getMyReadings);

export default router;
