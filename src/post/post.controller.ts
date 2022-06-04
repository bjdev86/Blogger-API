import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { RepliesService } from './replies/replies.service';

const POST_PATH = 'posts';

@Controller('blog')
export class PostController
{
  constructor( private readonly postService: PostService ) {}

  @Post(POST_PATH)
  create(@Body() createPostDto: CreatePostDto)
  {
    return this.postService.create(createPostDto);
  }

  @Get(POST_PATH)
  findAll()
  {
    return this.postService.findAll();
  }

  @Get(`${POST_PATH}/:id`)
  findOne(@Param('id') id: string)
  {
    return this.postService.findOne(id);
  }

  @Patch(`${POST_PATH}/:id`)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto)
  {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(`${POST_PATH}/:id`)
  remove(@Param('id') id: string)
  {
    return this.postService.remove(id);
  }
}
