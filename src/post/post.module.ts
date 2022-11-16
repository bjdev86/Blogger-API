import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NAME as PostName } from './entities/post.entity';
import { PostController } from './post.controller';
import { RepliesController } from './replies/replies.controller';
import { RepliesService } from './replies/replies.service';
import { PostSchema } from './schemas/post.schema';
import { PostService } from './services/post.service';

@Module(
{
  imports: 
  [
    // Mongoose/MongoDB onboard!
    MongooseModule.forFeature( 
    [{ name: PostName, schema: PostSchema }])
  ],
  controllers: [PostController, RepliesController],
  providers: 
  [
    PostService, 
    RepliesService,
  ]
})

export class PostModule {};
