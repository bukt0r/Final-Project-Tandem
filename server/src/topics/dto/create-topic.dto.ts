import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
