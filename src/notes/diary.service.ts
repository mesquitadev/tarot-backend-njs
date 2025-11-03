import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DiaryPersist } from './dto/DiaryPersist';

@Injectable()
export class DiaryService {
  constructor(private prisma: PrismaService) {
  }

  async create(data: any) {
    return this.prisma.diary.create({ data });
  }

  async findById(id: number) {
    const apiary = await this.prisma.diary.findUnique({
      where: { id: Number(id) },
    });

    if (!apiary) {
      throw new NotFoundException('Anotação não encontrada!');
    }

    return apiary;
  }

  async findAll() {
    return this.prisma.diary.findMany();
  }

  async findAllByUserId(userId) {
    return this.prisma.diary.findMany({
      where: {
        userId: Number(userId),
      },
    });
  }

  async update(id: number, data: DiaryPersist) {
    return this.prisma.diary.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id: number) {
    const apiary = await this.prisma.diary.findUnique({
      where: { id: Number(id) },
    });

    if (!apiary) {
      throw new NotFoundException('Anotação não encontrada!');
    }

    return this.prisma.diary.delete({ where: { id: Number(id) } });
  }
}
