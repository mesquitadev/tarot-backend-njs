import { Module } from '@nestjs/common';
import {MissionController} from "./mission.controller";
import {MissionService} from "./mission.service";
import {PrismaService} from "../prisma/prisma.service";

@Module({
    providers: [MissionService, PrismaService],
    controllers: [MissionController],
    exports: [MissionService]
})
export class MissionModule {}
