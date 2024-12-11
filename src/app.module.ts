import {Module} from '@nestjs/common';
import {PrismaService} from './prisma/prisma.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from "./users/users.module";
import { DiaryModule } from './notes/diary.module';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
    imports: [
        DiaryModule,
        ChallengeModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
