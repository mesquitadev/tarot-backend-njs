import {ConflictException, Injectable} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MeliponaryService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // const userHaveMeliponary = await this.prisma.meliponary.findFirst({
    //   where: {
    //     userId: data.userId,
    //   },
    // });
    //
    //
    // if (userHaveMeliponary) {
    //   throw new ConflictException('O usuário já tem um empreendimento do tipo meliponário cadastrado!');
    // }

    return this.prisma.meliponary.create({ data });
  }

  async findAllByUserId(userId) {
    return await this.prisma.meliponary.findMany({
      where: {
        userId: Number(userId),
      },
    });
  }

    async findAll() {
      return this.prisma.meliponary.findMany()
    }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async update(id: number, data: Prisma.MeliponaryCreateInput) {
    return this.prisma.meliponary.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }
}
