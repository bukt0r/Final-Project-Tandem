import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Difficulty } from './dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const question = await this.questionsService.findOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.questionsService.remove(id);
    return;
  }

  @Get('difficulty/:difficulty')
  @HttpCode(HttpStatus.OK)
  async findByDifficulty(@Param('difficulty') difficulty: string) {
    if (!Object.values(Difficulty).includes(difficulty as Difficulty)) {
      throw new NotFoundException(`Invalid difficulty: ${difficulty}`);
    }

    return this.questionsService.findByDifficulty(difficulty as Difficulty);
  }
}
