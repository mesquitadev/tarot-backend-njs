import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './dto/UserDTO';

interface FormatLogin extends Partial<User> {
  email: string;
}

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  //use by user module to change user password
  async updatePassword(payload: UpdatePasswordDto, id: number):
    Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('invalid_credentials',
        HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await compare(payload.old_password,
      user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials',
        HttpStatus.UNAUTHORIZED);
    }
    return this.prisma.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }

  //use by auth module to register user in database
  async create(userDto: CreateUserDto): Promise<any> {

    // check if the user exists in the db
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist',
        HttpStatus.CONFLICT);
    }
    userDto.password = await hash(userDto.password, 10);
    const user = await this.prisma.user.create({
      data: userDto,
    });

    // Exclude the password from the returned user object
    const { password, cpf, ...result } = user;
    return result;
  }

  //use by auth module to login user
  async findByLogin({ email, password }: LoginUserDto):
    Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('invalid_credentials',
        HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials',
        HttpStatus.UNAUTHORIZED);
    }

    const { password: p, ...rest } = user;
    return rest;
  }

  //use by auth module to get user in database
  async findByPayload({ email }: any): Promise<any> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

}
