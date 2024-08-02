import {ConflictException, Injectable} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApiaryService {
  constructor(private prisma: PrismaService) {}
  async create(data: any) {
    // const userHaveApiary = await this.prisma.apiary.findFirst({
    //   where: {
    //     userId: data.userId,
    //   },
    // });
    //
    // if (userHaveApiary) {
    //   throw new ConflictException(
    //       'O empreendimento já está cadastrado no apiário!',
    //   );
    // }

    return this.prisma.apiary.create({ data });
  }

  async findAll() {
    return this.prisma.apiary.findMany()
  }

  async findAllByUserId(userId) {
    return this.prisma.apiary.findMany({
      where: {
        userId: Number(userId),
      }
    })
  }

  async findOne(id: number) {
    return this.prisma.apiary.findUnique({ where: { id: Number(id) } });
  }

  async update(id: number, data: Prisma.ApiaryCreateInput) {
    return this.prisma.apiary.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.apiary.delete({ where: { id: Number(id) } });
  }
}
