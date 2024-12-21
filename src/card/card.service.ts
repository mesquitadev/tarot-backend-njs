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

  async create(data: CardPersist[]) {
    const createdCards = [];
    for (const card of data) {
      const createdCard = await this.prisma.card.create({
        data: {
          card: card.card,
          title: card.title,
          subtitle: card.subtitle,
          affirmation: card.affirmation,
          suggestedMusic: card.suggestedMusic,
          img: card.img,
          blend: card.blend,
          power: card.power,
          incense: card.incense,
        },
      });
      createdCards.push(createdCard);
    }
    return createdCards;
  }

  async delete(id: number) {
    return this.prisma.card.delete({ where: { id } });
  }

  async findWithLimit(limit: number) {
    return this.prisma.card.findMany({ take: limit });
  }

  async findRandom(limit: number) {
    const totalCards = await this.prisma.card.count();
    const randomOffset = Math.floor(Math.random() * (totalCards - limit));
    return this.prisma.card.findMany({ skip: randomOffset, take: limit });
  }
}