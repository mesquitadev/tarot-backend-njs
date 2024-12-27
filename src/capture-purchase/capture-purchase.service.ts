import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class CapturePurchaseService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async capture(data: any) {
    // Salvar os dados no banco de dados
    const savedData = await this.prisma.purchase.create({
      data: {
        ...data,
      },
    });

    await this.handleCapturePurchase(data);
    return { message: 'Purchase captured successfully', savedData };
  }

  async handleCapturePurchase(datas: any): Promise<User> {
    console.log('datasssss', datas.data.buyer)
    // Check if the user already exists
    const userInDb = await this.prisma.user.findFirst({
      where: { email: datas.data.buyer.email },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }

    // Generate a random password
    const password = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await hash(password, 10);

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        fullName: datas.data.buyer.name,
        email: datas.data.buyer.email,
        cpf: datas.data.buyer.document,
        password: hashedPassword,
      },
    });

    // Send the password via email
    await this.mailerService.sendMail({
      to: datas.data.buyer.email,
      subject: 'Conta Criada',
      text: `Sua conta foi criada. Sua Senha é: ${password}`,
    });

    return user;
  }


}