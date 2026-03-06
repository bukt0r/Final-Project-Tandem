import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Difficulty } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { title, difficulty, topicIds } = createQuestionDto;

    await this.validateTopicIds(topicIds || []);

    const data: Prisma.QuestionCreateInput = {
      title,
      difficulty,
      ...(topicIds?.length && {
        topics: { connect: topicIds.map((id) => ({ id })) },
      }),
    };

    return this.prisma.question.create({ data });
  }

  async findAll(): Promise<Question[]> {
    return this.prisma.question.findMany();
  }

  async findOne(id: string): Promise<Question | null> {
    return this.prisma.question.findUnique({
      where: { id },
      include: { topics: true },
    });
  }

  async findByDifficulty(difficulty: Difficulty): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: { difficulty },
    });
  }

  async findByTopic(topicId: string): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: { topics: { some: { id: topicId } } },
      include: { topics: true },
    });
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const { title, difficulty, topicIds } = updateQuestionDto;
    await this.getQuestionOrThrow(id);

    if (topicIds !== undefined) {
      await this.validateTopicIds(topicIds);
    }

    const updateData: Prisma.QuestionUpdateInput = {};

    if (title !== undefined) {
      updateData.title = title;
    }
    if (difficulty !== undefined) {
      updateData.difficulty = difficulty;
    }
    if (topicIds !== undefined) {
      updateData.topics = { set: topicIds.map((id) => ({ id })) };
    }

    return this.prisma.question.update({
      where: { id },
      data: updateData,
      include: { topics: true },
    });
  }

  async remove(id: string): Promise<Question> {
    await this.getQuestionOrThrow(id);
    return this.prisma.question.delete({ where: { id } });
  }

  private async validateTopicIds(topicIds: string[]): Promise<void> {
    if (!topicIds?.length) return;

    const existingTopics = await this.prisma.topic.findMany({
      where: { id: { in: topicIds } },
      select: { id: true },
    });

    if (existingTopics.length !== topicIds.length) {
      const foundIds = existingTopics.map((t) => t.id);
      const invalidIds = topicIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Invalid topic IDs: ${invalidIds.join(', ')}`,
      );
    }
  }

  private async getQuestionOrThrow(id: string): Promise<Question> {
    const question = await this.prisma.question.findUnique({ where: { id } });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }
}
