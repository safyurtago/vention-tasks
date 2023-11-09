import { IsOptional, IsString } from "class-validator";


export class UpdateUserDto {
  @IsString()
  @IsOptional()
  first_name: string;
  @IsString()
  @IsOptional()
  last_name: string;
  @IsString()
  @IsOptional()
  username: string;
  @IsString()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  phone_number: string;
  @IsOptional()
  photo_url: any;
}
