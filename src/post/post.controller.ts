import { Controller, Get, Post, Body, 
         Patch, Param, Delete }         from '@nestjs/common';
import { PostService }                  from './post.service';
import { RepliesService}                from './replies.service';
import { CreatePostDto }                from './dto/create-post.dto';
import { UpdatePostDto }                from './dto/update-post.dto';
import { UpdateReplyDto } from './replies/dto/update-reply.dto';

const POST_PATH = 'posts',
      RPYL_PATH = 'replies';

@Controller('blog')
export class PostController
{
  constructor(private readonly postService: PostService,
              private readonly replyService: RepliesService) { }

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

  /******************************* REPLY POSTS ********************************/
  @Patch(`${RPYL_PATH}`)
  updateReply( @Body() updatePostDto: UpdateReplyDto)
  {
    return this.replyService.update(updatePostDto);
  }
}
