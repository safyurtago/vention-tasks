import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserFriendDto {
  @IsString()
  @IsNotEmpty()
  friendId: string;
}
