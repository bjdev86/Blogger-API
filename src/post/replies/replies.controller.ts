import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
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
}
