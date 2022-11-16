import { Test, TestingModule } from '@nestjs/testing';
import { PostModule } from '../post.module';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';

describe('RepliesController', () => {
  let controller: RepliesController;

  beforeEach(async () => 
  {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepliesController],
      providers: [RepliesService],
      imports: [PostModule]

    }).compile();

    controller = await module.resolve(RepliesController);
  });

  it('should be defined', () => 
  {
    expect(controller).toBeDefined();
  });
});
