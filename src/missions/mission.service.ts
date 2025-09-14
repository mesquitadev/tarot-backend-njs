import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MissionPersist } from './dto/MissionPersist';

@Injectable()
export class MissionService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.mission.findMany();
  }

  async findById(id: number) {
    return this.prisma.mission.findUnique({ where: { id } });
  }

  async create(data: MissionPersist[]) {
    const createdMissions = [];
    for (const mission of data) {
      const createdMission = await this.prisma.mission.create({
        data: {
          day: mission.day,
          title: mission.title,
          task: mission.task,
        },
      });
      createdMissions.push(createdMission);
    }
    return createdMissions;
  }

  async delete(id: number) {
    return this.prisma.mission.delete({ where: { id } });
  }
}