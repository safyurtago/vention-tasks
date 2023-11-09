import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Put, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { ChangePasswordDto, CreateUserDto, FindFilteredUsersDto, LoginUserDto, UpdateUserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CookieGetter } from '../../../../libs/common/decorators/cookie-getter.decorator';
import { UserGuard } from '../../../../libs/common/guards/user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  signUp (
    @Body() createUserDto: CreateUserDto, @Res({passthrough: true}) res: Response, @UploadedFile() file: any
  ) {
    return this.userService.signUp(createUserDto, res, file);
  }



  @Get('activate/:link')
  activate (@Param('link') link: string) {
      return this.userService.activate(link)
  }




  @Post('signin')
  signIn (
    @Body() loginUserDto: LoginUserDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.userService.signIn(loginUserDto, res);
  }



  @UseGuards(UserGuard)
  @Post('signout')
  signOut (
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response
  ) {
    return this.userService.signOut(refreshToken, res);
  }



  @Post('find')
  findAll(@Body() findFilteredUsersDto: FindFilteredUsersDto) {
    return this.userService.findFilteredUsers(findFilteredUsersDto);
  }




  @UseGuards(UserGuard)
  @Post(':id/refresh')
  refreshToken(
    @Param('id') id: string, @CookieGetter('refresh_token') refreshToken: string, 
    @Res({passthrough: true}) res: Response
  ) {
    return this.userService.refreshToken(id, refreshToken, res)
  }



  @UseGuards(UserGuard)
  @Get('findone/:id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.userService.findOneUser(id, req);
  }
  



  @UseGuards(UserGuard)
  @Put('update/:id')
  updateUser(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    ) {
    return this.userService.updateUser(id, updateUserDto, req);
  }



  @UseGuards(UserGuard)
  @Delete('delete/:id')
  deleteUser(
    @Param('id') id: string, 
    @Req() req: Request,
    ) {
    return this.userService.deleteUser(id, req);
  }



  @UseGuards(UserGuard)
  @Patch('change-password')
  changePassword (
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request,
    ) {
    return this.userService.changePassword(changePasswordDto, req);
  }
  
}
