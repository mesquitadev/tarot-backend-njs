import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CapturePurchaseService {
  constructor(private prisma: PrismaService) {}

  async capture(data: any) {
    // Salvar os dados no banco de dados
    const savedData = await this.prisma.purchase.create({
      data: {
        ...data,
      },
    });
    return { message: 'Purchase captured successfully', savedData };
  }
}