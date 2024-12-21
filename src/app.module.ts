import {Module} from '@nestjs/common';
import {PrismaService} from './prisma/prisma.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from "./users/users.module";
import { DiaryModule } from './notes/diary.module';
import { MissionModule } from './missions/mission.module';
import { CapturePurchaseModule } from './capture-purchase/capture-purchase.module';
import { CardModule } from './card/card.module';

@Module({
    imports: [
        DiaryModule,
        MissionModule,
        CardModule,
        CapturePurchaseModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
