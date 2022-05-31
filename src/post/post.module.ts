import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { RepliesService } from './replies.service';

@Module({
  controllers: [PostController],
  providers: [PostService, RepliesService]
})
export class PostModule {}
