import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import exp from 'constants';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { BadRequestException } from './exceptions/badrequest.exception';

// Module Constants 
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
  async create( @Body() createPostDto: CreatePostDto )
  {
    return await this.postService.create(createPostDto);
  }

  @Get(POST_PATH)
  async findAll()
  {
    return await this.postService.findAll();
  }

  @Get(`${POST_PATH}/:id`)
  async findOne(@Param('id') id: string)
  {
    return await this.postService.findOne(id);
  }

  @Patch(`${POST_PATH}/:id`)
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto)
  {
    return await this.postService.update(id, updatePostDto);
  }

  @Delete(`${POST_PATH}/:id`)
  remove( @Param('id') id: string )
  {
    try
    {
      return this.postService.remove(id);
    }
    catch( exp ) 
    {
      if ( exp.name === BadRequestException.name ) 
      {
         throw new BadRequestException();
      }
    }
  }
}
