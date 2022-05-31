import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BlogpostModule } from './blogpost/blogpost.module';
//import { BlogModule } from './blog/blog/blog.module';
import { PostModule } from './post/post.module';
import { PostsModule } from './posts/posts.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [BlogpostModule, PostModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
