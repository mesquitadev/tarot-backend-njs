import { Body, Controller, Post } from '@nestjs/common';
import { CapturePurchaseService } from './capture-purchase.service';
import { CapturePurchasePersist } from './dto/CapturePurchasePersist';

@Controller('/api/v1/capture-purchase')
export class CapturePurchaseController {
  constructor(private capturePurchaseService: CapturePurchaseService) {}

  @Post()
  async capture(@Body() data: CapturePurchasePersist) {
    return this.capturePurchaseService.capture(data);
  }
}
