import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CardService } from './card.service';
import { CardPersist } from './dto/CardPersist';

@Controller('/api/v1/cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  async findAll(@Query('limit') limit?: number, @Query('random') random?: boolean) {
    if (limit && random) {
      return this.cardService.findRandom(Number(limit));
    } else if (limit) {
      return this.cardService.findWithLimit(Number(limit));
    } else {
      return this.cardService.findAll();
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return this.cardService.findById(id);
  }

  @Post()
  async handle(@Body() data: CardPersist | CardPersist[]) {
    if (!Array.isArray(data)) {
      data = [data];
    }
    return this.cardService.create(data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.cardService.delete(id);
  }
}