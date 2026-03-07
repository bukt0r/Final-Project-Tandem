import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, password, login } = createUserDto;

    await this.checkEmailIsUnique(email);

    if (login) {
      await this.checkLoginIsUnique(login);
    }

    const hashedPassword = await this.hashPassword(password).catch(() => {
      throw new InternalServerErrorException('Failed to hash password');
    });

    const data: Prisma.UserCreateInput = {
      email,
      password: hashedPassword,
      ...(login && { login }),
    };

    const user = await this.prisma.user.create({ data });
    return this.toUserResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.toUserResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toUserResponseDto(user) : null;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.getUserOrThrow(id);
    const { email, password, login } = updateUserDto;

    if (email && email !== existingUser.email) {
      await this.checkEmailIsUnique(email, id);
    }

    if (login !== undefined && login !== existingUser.login) {
      if (login) {
        await this.checkLoginIsUnique(login, id);
      }
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (email !== undefined) {
      updateData.email = email;
    }
    if (password !== undefined) {
      updateData.password = await this.hashPassword(password).catch(() => {
        throw new InternalServerErrorException('Failed to hash password');
      });
    }
    if (login !== undefined) {
      updateData.login = login;
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return this.toUserResponseDto(user);
  }

  async remove(id: string): Promise<void> {
    await this.getUserOrThrow(id);
    await this.prisma.user.delete({ where: { id } });
  }

  async validatePassword(user: User, plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, user.password);
  }

  private async checkEmailIsUnique(
    email: string,
    excludeUserId?: string,
  ): Promise<void> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser && existingUser.id !== excludeUserId) {
      throw new ConflictException('User with this email already exists');
    }
  }

  private async checkLoginIsUnique(
    login: string,
    excludeUserId?: string,
  ): Promise<void> {
    const existingUser = await this.prisma.user.findUnique({
      where: { login },
    });
    if (existingUser && existingUser.id !== excludeUserId) {
      throw new ConflictException('User with this login already exists');
    }
  }

  private async getUserOrThrow(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private toUserResponseDto(user: User): UserResponseDto {
    return {
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      updatedAt: user.updatedAt,
      login: user.login ?? undefined,
    };
  }
}
