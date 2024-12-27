import {Module} from '@nestjs/common';
import {PrismaService} from './prisma/prisma.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from "./users/users.module";
import { DiaryModule } from './notes/diary.module';
import { MissionModule } from './missions/mission.module';
import { CapturePurchaseModule } from './capture-purchase/capture-purchase.module';
import { CardModule } from './card/card.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        MailerModule.forRoot({
          transport: {
            host: 'sandbox.smtp.mailtrap.io',
            port: 587,
            auth: {
              user: '53a8b1701a570e',
              pass: '2048a0655b7d5c',
            },
          },
          defaults: {
            from: '"Programa Poderrosa" <naoresponda@poderrosa.com>',
          },
        }),
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
