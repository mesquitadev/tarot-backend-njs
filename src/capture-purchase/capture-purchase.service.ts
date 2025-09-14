import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import * as crypto from 'crypto';


export function generateFakeCPF(): string {
  const randomDigits = (): number => Math.floor(Math.random() * 9) + 1;

  const cpf = Array.from({ length: 9 }, randomDigits);

  const calculateDigit = (base: number[]): number => {
    const sum = base.reduce((acc, digit, index) => acc + digit * (base.length + 1 - index), 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cpf);
  cpf.push(firstDigit);

  const secondDigit = calculateDigit(cpf);
  cpf.push(secondDigit);

  return cpf.join('');
}

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

  async handleCapturePurchase(datas: any): Promise<void> {
    console.log('datasssss', datas.data.buyer)
    // Check if the user already exists
    // const userInDb = await this.prisma.user.findFirst({
    //   where: { email: datas.data.buyer.email },
    // });
    // if (userInDb) {
    //   throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    // }

    // // Generate a random password
    // const password = crypto.randomBytes(8).toString('hex');
    // const hashedPassword = await hash(password, 10);

    // // Create the user
    // const user = await this.prisma.user.create({
    //   data: {
    //     fullName: datas.data.buyer.name,
    //     email: datas.data.buyer.email,
    //     cpf: datas.data.buyer.document || generateFakeCPF(),
    //     password: hashedPassword,
    //   },
    // });

    // Send the password via email
    await this.mailerService.sendMail({
      to: datas.data.buyer.email,
      subject: 'Conta Criada',
      text: `Sua conta foi criada. Sua Senha é:`,
    });

    // return user;
  }


}