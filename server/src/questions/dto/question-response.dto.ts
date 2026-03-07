import { $Enums } from '@prisma/client';

export class QuestionResponseDto {
  id: string;
  title: string;
  difficulty: $Enums.Difficulty;
  createdAt: Date;
  updatedAt: Date;
  topicIds: string[];
}
