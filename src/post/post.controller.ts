import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters } from '@nestjs/common';
import { BlogExceptionFilter } from 'src/exceptions/blog-exceptions.filter';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BadRequestException } from './exceptions/badrequest.exception';
import { CreateDtoValidationPipe } from './pipes/createDTO-validation.pipe';
import { IdValidationPipe } from './pipes/id-validation.pipe';
import { UpdateDtoValidationPipe } from './pipes/updateDTO-validation.pipe';
import { PostService } from './post.service';

// Module Constants 
const POST_PATH = 'posts';

/**
 * 
 */
@Controller('blog')
@UseFilters( BlogExceptionFilter )
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
  async create( @Body( CreateDtoValidationPipe ) createPostDto: CreatePostDto )
  {
    // Create a new blog post and add it to the 
    await this.postService.create( createPostDto );
  }

  /**
   * Handler to return all of the documents in database.
   * 
   * @returns JSON Object containing all the documents in the database
   * 
   * todo Add limit and offset
   */
  @Get(POST_PATH)
  async findAll()
  {
    // Fetch all of the blog posts from the database 
    return await this.postService.findAll();
  }

  @Get(`${POST_PATH}/:id`)
  async findOne(@Param('id', IdValidationPipe ) id: string)
  {
    // Query the database for the specific blog post
    const dbRes = await this.postService.findOne(id);

    return dbRes;
  }

  /**
   * Function to update the contents and properties of a specific blog post. 
   * 
   * @param id The ObjectId for the blogpost being updated
   * 
   * @param updatePostDto The object containing the data intended to be 
   *                      conveyed to the function for the update. 
   * 
   * @returns Boolean indicating success or failure of the update operation
   */
  @Patch(`${POST_PATH}/:id`)
  async update( @Param('id') id: string, 
                @Body( UpdateDtoValidationPipe ) updatePostDto: UpdatePostDto )
  {
    // Make the update capture the database result
    const dbRes = await this.postService.update(id, updatePostDto);

    // If the dbResult is null throw a BadRequest Exception 
    if (dbRes === null)
     {
        throw new BadRequestException();
     }
  }

  /**
   * Deletes a single document from the database. 
   * 
   * @param id The ObjectId of the document to delete from the database
   * 
   * @example {}
   * 
   * @returns Boolean indicating whether the deletetiong succeeded or failed
   */
  @Delete(`${POST_PATH}/:id`)
  async remove( @Param('id', IdValidationPipe ) id: string )
  {
    // Preform the record deletion capture the result 
     await this.postService.remove( id );
  }
}
