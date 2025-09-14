import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CardService } from './card.service';
import { CardController } from './card.controller';

@Module({
  providers: [CardService, PrismaService],
  controllers: [CardController],
})
export class CardModule {}