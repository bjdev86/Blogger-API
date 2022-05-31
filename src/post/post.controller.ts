import { Controller, Get, Post, Body, 
         Patch, Param, Delete }         from '@nestjs/common';
import { PostService }                  from './post.service';
import { CreatePostDto }                from './dto/create-post.dto';
import { UpdatePostDto }                from './dto/update-post.dto';

const PATH = 'posts'; 

@Controller('blog')
export class PostController
{
  constructor(private readonly postService: PostService) { }

  @Post(PATH)
  create(@Body() createPostDto: CreatePostDto)
  {
    return this.postService.create(createPostDto);
  }

  @Get(PATH)
  findAll()
  {
    return this.postService.findAll();
  }

  @Get(`${PATH}/:id`)
  findOne(@Param('id') id: string)
  {
    return this.postService.findOne(id);
  }

  @Patch(`${PATH}/:id`)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto)
  {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(`${PATH}/:id`)
  remove(@Param('id') id: string)
  {
    return this.postService.remove(id);
  }
}
