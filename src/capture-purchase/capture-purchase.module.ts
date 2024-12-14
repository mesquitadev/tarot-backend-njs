import {Module} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { CapturePurchaseService } from './capture-purchase.service';
import { CapturePurchaseController } from './capture-purchase.controller';

@Module({
    providers: [CapturePurchaseService, PrismaService],
    controllers: [CapturePurchaseController],
    exports: [CapturePurchaseService]
})
export class CapturePurchaseModule {
}
