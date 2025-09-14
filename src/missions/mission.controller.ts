import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionPersist } from './dto/MissionPersist';
import { User } from '../decorator/current-user-decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/api/v1/missions')
// @UseGuards(JwtAuthGuard)
export class MissionController {
  constructor(private challengeService: MissionService) {
  }

  @Get()
  async findAll() {
    return this.challengeService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return this.challengeService.findById(id);
  }


  @Post()
  async handle(@Body() data: MissionPersist[]) {
    await this.challengeService.create(data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.challengeService.delete(id);
  }
}
