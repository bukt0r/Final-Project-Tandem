import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsEnum(Difficulty)
  @IsNotEmpty({ message: 'Difficulty is required' })
  difficulty: Difficulty;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  topicIds?: string[];
}
