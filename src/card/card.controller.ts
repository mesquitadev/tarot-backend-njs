import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { CardPersist } from './dto/CardPersist';

@Controller('/api/v1/cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  async findAll() {
    return this.cardService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return this.cardService.findById(id);
  }

  @Post()
  async handle(@Body() data: CardPersist) {
    return this.cardService.create(data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.cardService.delete(id);
  }
}