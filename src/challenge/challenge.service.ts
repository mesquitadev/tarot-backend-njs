import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}


  async findAll() {
    return this.prisma.challenge.findMany();
  }

  async create(data: any) {
    return this.prisma.challenge.create({ data });
  }


  async findById(id: number) {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id },
    });

    if (!challenge) {
      throw new NotFoundException('Meliponário não encontrado!');
    }
    return this.prisma.challenge.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Prisma.ChallengeCreateInput) {
    return this.prisma.challenge.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id: number) {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: Number(id) },
    });

    if (!challenge) {
      throw new NotFoundException('Desafio não encontrado!');
    }


    return this.prisma.challenge.delete({ where: { id: Number(id) } });
  }
}
