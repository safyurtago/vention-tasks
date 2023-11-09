import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UserGuard } from '../../../../libs/common/guards/user.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(UserGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request, @UploadedFile() file: any) {
    return this.postService.create(createPostDto, req, file);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request, @UploadedFile() file: any) {
    return this.postService.update(id, updatePostDto, req, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
