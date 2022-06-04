import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { RepliesController } from './replies/replies.controller';
import { RepliesService } from './replies/replies.service';
import { Post } from './entities/post.entity';
import PostSchema from './schemas/post.schema';

@Module(
{
  imports: 
  [
    // Mongoose/MongoDB onboard!
    MongooseModule.forFeature( 
    [{ name: Post.name, schema: PostSchema }])
  ],
  controllers: [PostController, RepliesController],
  providers: [PostService, RepliesService]
})
export class PostModule {}
