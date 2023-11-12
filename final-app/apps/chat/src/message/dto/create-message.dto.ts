import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  receiverId: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}
