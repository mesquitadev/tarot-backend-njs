import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengePersist } from './dto/ChallengePersist';
import { User } from '../decorator/current-user-decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/api/v1/challenge')
@UseGuards(JwtAuthGuard)
export class ChallengeController {
  constructor(private challengeService: ChallengeService) {
  }

  @Get()
  async findAll() {
    return this.challengeService.findAll();
  }

  @Get('/:id')
  async findById(@User() user: any, @Param('id') id: number) {
    return this.challengeService.findById(id);
  }


  @Post()
  async handle(@User() user: any, @Body() data: ChallengePersist) {
    data.userId = user.id;
    await this.challengeService.create(data);
  }

  @Delete('/:id')
  async delete(@User() user: any, @Param('id') id: number) {
    return this.challengeService.delete(id);
  }
}
