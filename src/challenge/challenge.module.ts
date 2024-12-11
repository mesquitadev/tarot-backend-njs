import { Module } from '@nestjs/common';
import {ChallengeController} from "./challenge.controller";
import {ChallengeService} from "./challenge.service";
import {PrismaService} from "../prisma/prisma.service";

@Module({
    providers: [ChallengeService, PrismaService],
    controllers: [ChallengeController],
    exports: [ChallengeService]
})
export class ChallengeModule {}
