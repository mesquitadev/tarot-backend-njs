import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';

@Module({
  providers: [DiaryService, PrismaService],
  controllers: [DiaryController],
  exports: [DiaryService],
})
export class DiaryModule {}
