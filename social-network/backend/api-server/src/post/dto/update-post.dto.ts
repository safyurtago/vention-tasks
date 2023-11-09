import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsOptional()
  photo: any;
}
