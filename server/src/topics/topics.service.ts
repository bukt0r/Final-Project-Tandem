import { Injectable, NotFoundException } from '@nestjs/common';
import { Topic } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const { title, description } = createTopicDto;

    return this.prisma.topic.create({
      data: {
        title,
        description,
      },
    });
  }

  async findAll(): Promise<Topic[]> {
    return this.prisma.topic.findMany();
  }

  async findOne(id: string): Promise<Topic | null> {
    return this.prisma.topic.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });
  }

  async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const { title, description } = updateTopicDto;

    const existingTopic = await this.prisma.topic.findUnique({
      where: { id },
    });

    if (!existingTopic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    return this.prisma.topic.update({
      where: { id },
      data: {
        title,
        description,
      },
    });
  }

  async remove(id: string): Promise<Topic> {
    const existingTopic = await this.prisma.topic.findUnique({
      where: { id },
    });

    if (!existingTopic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    return this.prisma.topic.delete({
      where: { id },
    });
  }
}
