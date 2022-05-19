import { Module } from '@nestjs/common';
import { BlogpostService } from './blogpost.service';
import { BlogpostController } from './blogpost.controller';

// eslint-disable-next-line prettier/prettier
@Module
({
  controllers: [BlogpostController],
  providers: [BlogpostService],
})
export class BlogpostModule {}
