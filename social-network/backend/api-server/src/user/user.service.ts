import { FileService } from './../file/file.service';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { ChangePasswordDto, CreateUserDto, FindFilteredUsersDto, LoginUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import {v4} from 'uuid';
import { Request, Response } from 'express';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly fileService: FileService
  ) {}

  // SIGN UP USER
  async signUp (
    createUserDto: CreateUserDto, res: Response, file: any
  ) {
    const {
      first_name, last_name, email, password, confirm_password, username, phone_number, photo
    } = createUserDto;
    
    const findUser = await this.prismaService.user.findUnique({where: {email, username}})
    if (findUser) { throw new BadRequestException('This email is already in use! Please try again') }
    const findUser1 = await this.prismaService.user.findUnique({where: {username}})
    if (findUser1) { throw new BadRequestException('This Username is already in use! Please try again') }
    if (password !== confirm_password) { throw new BadRequestException('Passwords do not match!'); }

    const hashed_password: string = await bcrypt.hash(password, 12);
    let newUser: User;
    if (file != undefined) {
      const fileName = await this.fileService.createFile(file);
      newUser = await this.prismaService.user.create({
      data: {first_name, last_name, email, hashed_password, username, phone_number, photo_url: fileName}
      })
    } else {
      newUser = await this.prismaService.user.create({
        data: {first_name, last_name, email, hashed_password, username, phone_number}
      })
    }

    const tokens = await this.getUserTokens(newUser.id, newUser.email);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const activation_link = v4();
    
    const updatedUser = await this.prismaService.user.update({
      data: {
        hashed_refresh_token,
        activation_link,
      },
      where: {
        id: newUser.id
      }
    })

    await this.mailService.sendUserConfirmation(updatedUser);
    
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;

  }

  // ACTIVATE REGISTRATION
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found')
    }
    const findUser = await this.prismaService.user.findFirst({where: {activation_link: link, is_active: false}})
    if (!findUser) {
      throw new BadRequestException('User already activated')
    }

    await this.prismaService.user.update({
      data: {is_active: true},
      where: {activation_link: link, is_active: false, id: findUser.id}
    })

      
    const response = {
      message: 'User activated Successfully',
    }
    return response;
  }

  // SIGNIN USER
  async signIn (loginUserDto: LoginUserDto, res: Response) {
    const {email, password} = loginUserDto
    const user = await this.prismaService.user.findUnique({where: {email}})
    if (!user) throw new UnauthorizedException('User not found')
    if (!user.is_active) throw new BadRequestException('User not active')

    const isMatchPass = await bcrypt.compare(password, user.hashed_password)
    if (!isMatchPass) throw new UnauthorizedException('User not found')

    const tokens = await this.getUserTokens(user.id, user.email)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12)

    const updatedUser = await this.prismaService.user.update({
      data: {hashed_refresh_token},
      where: {id: user.id}
    })
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7*24*60*60*1000,
      httpOnly: true
    })
    return tokens;
  }

  // SIGN OUT USER
  async signOut (refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken,
      {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      
    if (!userData) throw new ForbiddenException('User not found')
    
      await this.prismaService.user.update({
      data: {hashed_refresh_token: null},
      where: {id: userData.sub}
    })

    res.clearCookie('refresh_token')
    const response = {
      message: 'User logged put successfully',
    }
    return response;
  }

  // REFRESH TOKEN USER
  async refreshToken (userId: string, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    
    if (userId != decodedToken['sub']) throw new BadRequestException('User not found')

    const user = await this.prismaService.user.findFirst({
      where: {id: userId},
    });
    if (!user || !user.hashed_refresh_token) throw new BadRequestException('User not found')

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token
    )
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const tokens = await this.getUserTokens(user.id, user.email);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const updateUser = await this.prismaService.user.update({
      data: {hashed_refresh_token},
      where: {id: userId},
    })

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })
    return tokens;
  }

  // FIN FILTERED USER 
  async findFilteredUsers (
    findFilteredUsersDto: FindFilteredUsersDto,
  ) {
    let where = {};
    if (findFilteredUsersDto.email) {
      where['email'] = {
          contains: findFilteredUsersDto.email
      }
    }
    if (findFilteredUsersDto.last_name) {
      where['last_name'] = {
          contains: findFilteredUsersDto.last_name
      }
    }
    if (findFilteredUsersDto.first_name) {
      where['first_name'] = {
          contains: findFilteredUsersDto.first_name
      }
    }
    if (findFilteredUsersDto.username) {
      where['username'] = {
          contains: findFilteredUsersDto.username
      }
    }
    return this.prismaService.user.findMany({where})
  }

  // FIND ONE USER BY ID
  async findOneUser (id: string, req: Request) {
    const userId = req['user'].id;
    const findUser = await this.prismaService.user.findFirst({where: {id}})
    if (!findUser) throw new BadRequestException('User not found');
    if (findUser.id !== userId) throw new BadRequestException('You dont have permission')
    return findUser;
  }

  // GET TOKENS METHOD 
  async getUserTokens(sub: string, email: string) {
    const jwtPayload: {sub: string, email: string} = {
      sub,
      email
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      })
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  // UPDATE USER BY ID
  async updateUser (
    id: string, updateUserDto: UpdateUserDto, req: Request,
  ) {
    const userId = req['user'].id;
    const findUser = await this.prismaService.user.findFirst({where:{id}});
    if (!findUser) throw new BadRequestException("User not found");
    if (findUser.id !== userId) throw new BadRequestException("You dont have permission");
    return this.prismaService.user.update({
      data: {...updateUserDto},
      where: {id},
    })
  }

  // DELETE USER BY ID 
  async deleteUser (
    id: string, req: Request,
  ) {
    const userId = req['user'].id;
    const findUser = await this.prismaService.user.findFirst({where:{id}});
    if (!findUser) throw new BadRequestException("User not found");
    if (findUser.id !== userId) throw new BadRequestException("You dont have permission");
    return this.prismaService.user.delete({where: {id}})
  }


  // CHANGE PASSWORD USER
  async changePassword (
    changePasswordDto: ChangePasswordDto,
    req: Request,
    ) {
      try {
        const userId = req['user'].id;
        const findUser = await this.prismaService.user.findFirst({where:{id: userId}});
        const isMatchPass = await bcrypt.compare(changePasswordDto.old_password, findUser.hashed_password)
        if (!isMatchPass) throw new UnauthorizedException('Old password not match');
        if (changePasswordDto.new_password !== changePasswordDto.confirm_new_password) {
          throw new BadRequestException("New passwords do not match");
        }
        const new_hashed_password = await bcrypt.hash(changePasswordDto.new_password, 12);
        await this.prismaService.user.update({
          data: {hashed_password: new_hashed_password},
          where: {id: userId}
        })
        return true;
      } catch (error) {
        return false;
      }
  }
}
