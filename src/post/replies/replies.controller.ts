import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { RepliesService } from './replies.service';

const SUBPATH = 'post/replies';

@Controller(`blog/${SUBPATH}`)
export class RepliesController 
{
  // Constructor to inject needed objects for this controller to run.
  constructor( private readonly replyService: RepliesService ) {}

  @Post()
  create( @Body() createReplyDto: CreateReplyDto ): Promise<any> 
  {
    return this.replyService.create( createReplyDto );
  }

  /**
   * 
   * @param path 
   * @returns 
   */
  @Get()
  retrieveOne(@Body('path') path )
  {
    return this.replyService.findOne(path);
  }

  /**
   * 
   * @param updatePostDto 
   * @returns
   * 
   * TODO: Should the body contain the path or should this passed as a 
   * parameter?  
   */
  @Patch()
  update( @Body() updatePostDto: UpdateReplyDto)
  {
    return this.replyService.update(updatePostDto);
  }

    /**
   * 
   * @param path 
   * @returns 
   */
     @Delete()
     deleteOne(@Body('path') path )
     {
       return this.replyService.deleteOne(path);
     }
}
