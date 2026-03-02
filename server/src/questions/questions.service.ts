import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Difficulty } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { title, difficulty } = createQuestionDto;

    return this.prisma.question.create({
      data: {
        title,
        difficulty,
      },
    });
  }

  async findAll(): Promise<Question[]> {
    return this.prisma.question.findMany();
  }

  async findOne(id: string): Promise<Question | null> {
    return this.prisma.question.findUnique({
      where: { id },
      include: {
        topics: true,
      },
    });
  }

  async findByDifficulty(difficulty: Difficulty): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: {
        difficulty,
      },
    });
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const { title, difficulty } = updateQuestionDto;

    const existingQuestion = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    const updateData: Partial<Question> = {};
    if (title !== undefined) {
      updateData.title = title;
    }
    if (difficulty !== undefined) {
      updateData.difficulty = difficulty;
    }

    return this.prisma.question.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<Question> {
    const existingQuestion = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return this.prisma.question.delete({
      where: { id },
    });
  }
}
