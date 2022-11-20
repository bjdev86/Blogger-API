import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { Name as PostName, PostSchema } from './post/schemas/post.schema';

@Module(
{
  imports: 
  [ 
    ConfigModule.forRoot(),
    // Configure the schema with for feature function 
    MongooseModule.forFeature(
    [
      {
        name: PostName,
        schema: PostSchema
      },
    ]),
    MongooseModule.forRoot( 
      `${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}` ),
    PostModule
  ]
})

export class AppModule {}
