import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { RepliesService } from './replies/replies.service';

const POST_PATH = 'posts';

/**
 * 
 */
@Controller('blog')
export class PostController
{
  constructor( private readonly postService: PostService ) {}

  /**
   * Function to handle POST update requests for blog posts. 
   *  
   * @param createPostDto Data Transfer Object to convey the data passed 
   * through this route to the service handler serving this route handler. 
   * 
   * @returns JSON object indicating a success or failure of the service 
   * operation. 
   */
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
