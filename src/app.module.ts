import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BlogpostModule } from './blogpost/blogpost.module';
//import { BlogModule } from './blog/blog/blog.module';

@Module({
  imports: [BlogpostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
