
import prisma from '../../infrastructure/db/prismaClient';
import { Club, ClubMember, ReadingStatus, Post } from '@prisma/client';

export class ClubUseCase {
  async getAllClubs() {
    return prisma.club.findMany();
  }

  async getClubById(id: string) {
    return prisma.club.findUnique({ where: { id } });
  }

  async createClub(data: {
    name: string;
    description?: string;
    imageUrl?: string;
    creatorId: string;
  }): Promise<Club> {
    return prisma.club.create({
      data: { ...data, isPublic: true }
    });
  }

  async joinClub(clubId: string, userId: string): Promise<ClubMember> {
    return prisma.clubMember.create({
      data: { userId, clubId }
    });
  }

  async createPost(data: {
    content: string;
    userId: string;
    clubId: string;
  }): Promise<Post> {
    return prisma.post.create({ data });
  }

  async addReading(data: {
    userId: string;
    bookId: string;
    status: ReadingStatus;
  }) {
    return prisma.reading.upsert({
      where: { userId_bookId: { userId: data.userId, bookId: data.bookId } },
      update: { status: data.status },
      create: { ...data }
    });
  }

  async getMyReadings(userId: string) {
    return prisma.reading.findMany({ where: { userId }, include: { book: true } });
  }
}
