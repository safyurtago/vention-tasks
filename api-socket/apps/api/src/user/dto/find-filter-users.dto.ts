
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FindFilteredUsersDto {
  @IsString()
  @IsOptional()
  first_name?: string;
  @IsString()
  @IsOptional()
  last_name?: string;
  @IsString()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  username?: string;
}