import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { RepliesService } from './replies.service';
import { Post } from './entities/post.entity';
import { PostSchema } from './schemas/post.schema';

@Module(
{
  imports: [MongooseModule.forFeature( [{ name: Post.name, schema: PostSchema }] )],
  controllers: [PostController],
  providers: [PostService, RepliesService]
})
export class PostModule {}
