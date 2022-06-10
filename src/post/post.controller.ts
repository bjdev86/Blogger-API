import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import exp from 'constants';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { BadRequestException } from './exceptions/badrequest.exception';
import { ApiOperation } from '@nestjs/swagger';

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
   *                      through this route to the service handler serving 
   *                      this route handler. 
   * @body createPOstDto 
   * 
   * @returns JSON object indicating a success or failure of the service 
   * operation. 
   */
  // @ApiOperation({summary: "Creates a new blog post and saves it in the database. "})
  @Post(POST_PATH)
  async create( @Body() createPostDto: CreatePostDto )
  {
    return await this.postService.create(createPostDto);
  }

  /**
   * Handler to return all of the documents in database.
   * 
   * @returns JSON Object containing all the documents in the database
   */
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

  /**
   * Deletes a single document from the database. 
   * 
   * @param id The ObjectId of the document to delete from the database
   * 
   * @example {}
   * @returns 
   */
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
