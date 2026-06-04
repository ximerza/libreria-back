
import { Request, Response } from 'express';
import { ClubUseCase } from '../../application/usecases/club.usecase';
import { z } from 'zod';

const clubUseCase = new ClubUseCase();

export const getAllClubs = async (req: Request, res: Response) => {
  try {
    const clubs = await clubUseCase.getAllClubs();
    res.json({
      status: 'success', data: clubs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error getting clubs' });
  }
};

export const getClubById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const club = await clubUseCase.getClubById(id);
    if (!club) {
      return res.status(404).json({ status: 'error', message: 'Club not found' });
    }
    res.json({ status: 'success', data: club });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error getting club' });
  }
};

export const createClub = async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      name: z.string(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
    });

    const { name, description, imageUrl } = schema.parse(req.body);
    const userId = (req as any).user?.id;
    const club = await clubUseCase.createClub({ name, description, imageUrl, creatorId: userId! });
    await clubUseCase.joinClub(club.id, userId!);
    res.status(201).json({ status: 'success', data: club });
  } catch (error) {
    res.status(400).json({ status: 'error', message: (error as any).message });
  }
};

export const joinClub = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const userId = (req as any).user?.id;
    const membership = await clubUseCase.joinClub(clubId, userId!);
    res.json({ status: 'success', data: membership });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Could not join club' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const { content } = req.body;
    const userId = (req as any).user?.id;
    const post = await clubUseCase.createPost({ content, userId, clubId });
    res.status(201).json({ status: 'success', data: post });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Could not create post' });
  }
};

export const addReading = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = (req as any).user?.id;
    const reading = await clubUseCase.addReading({ ...data, userId });
    res.json({ status: 'success', data: reading });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Could not add reading' });
  }
};

export const getMyReadings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const readings = await clubUseCase.getMyReadings(userId);
    res.json({ status: 'success', data: readings });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Could not get readings' });
  }
};
