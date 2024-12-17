import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CardPersist } from './dto/CardPersist';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.card.findMany();
  }

  async findById(id: number) {
    return this.prisma.card.findUnique({ where: { id } });
  }

  async create(data: CardPersist) {
    return this.prisma.card.create({
      data: {
        card: data.card,
        title: data.title,
        subtitle: data.subtitle,
        affirmation: data.affirmation,
        suggestedMusic: data.suggestedMusic,
        img: data.img,
        blend: data.blend,
        power: data.power,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.card.delete({ where: { id } });
  }
}