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
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
              user: '849a4a002@smtp-brevo.com',
              pass: 'qQOMCXwH3FJ65ETc',
            },
            options: {
              tls: {
                rejectUnauthorized: false,
              },
            },
          },
          defaults: {
            from: '"Programa Poderrosa" <mesquitadev@gmail.com>',
          },
          options: {
            tls: {
              rejectUnauthorized: false,
            },
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
