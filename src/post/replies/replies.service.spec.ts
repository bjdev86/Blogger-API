import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Schema } from 'mongoose';
import { CreateReplyDtoStub } from '../../../test/createReply.dto.stub';
import { CreateReplyDto } from './dto/create-reply.dto';

import { ReplyModel } from './entities/reply.entity';
import { REPLY_NAME as ReplyName } from './entities/reply.entity';
import { RepliesService } from './replies.service';
import { ReplyModelType } from './schemas/reply.schema';

// Test suite for post serivce unit tests. 
describe('PostService', () =>
{
  // Local Variable Declaration 
  let mongoConnection: Connection;
  let replyModel: ReplyModelType;
  let mockReplyID: string; 
  let replyService: RepliesService;
  //let model: PostModelType; 

  // Constructing mock reply to test with 
  const mockReply:CreateReplyDto = CreateReplyDtoStub();

  // Setup a connection to the database before all the tests have run 
  beforeAll(async () => 
  {
    // Compute the dbURI from environment variables 
    const dbURI = `${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`;

    // Setup the connection to the database 
    try
    {
      mongoConnection = (await connect(dbURI)).connection;
    }
    catch(error)
    {
      console.log(`Connection error: ${error}`);
    }
    
    // Get the postModel from the connection 
    replyModel = mongoConnection.model<ReplyModel, ReplyModelType>( 
      ReplyName, new Schema<ReplyModel, ReplyModelType>(
      {
        author: String,
        date: Date,
        body: String,
        replies: [new Schema<ReplyModel>(
        {
          author: String,
          date: Date,
          body: String,
          path: String,
          replies: [new Schema<ReplyModel>()]
        })],
      })
    );
    
    // Create the token module to use for these tests 
    const module: TestingModule = await Test.createTestingModule(
    {
      //controllers: [PostController],
      providers: 
      [
        RepliesService,
        {
          provide: getModelToken(ReplyName), useValue: replyModel
        },
      ],  
    }).compile();

    // Get the post controller to use in the tests 
    replyService = module.get<RepliesService>(RepliesService);
    replyModel = module.get<ReplyModelType>(getModelToken('Post'));
  });

  afterAll(async () => 
  {
    // Close the Mongo connection to the database
    await mongoConnection.close();  
  });

 /*-------------------------- BEGIN TEST SUITE -------------------------------*/
  test('should be defined', () =>
  {
    expect(replyService).toBeDefined();
  });

  test("Create a new post", async () => 
  {
    // Add a new post using the service and save the id created  
    mockReplyID = await replyService.create(mockReply);

    // Make sure post ID is defined. 
    return expect(mockReplyID).toBeDefined();
  });

  test.todo("Add a group of replies to a post");

  test("Read the mock post from the database", async () => 
  {
    /* Fetch the mockpost from the database and make sure it matches the 
     * original */
    return expect (replyService.findOne(mockReplyID)).resolves
          .toMatchObject(mockReply);
  });

  test.todo("Read all the group of mock replies added to the database"); 

  test("Update mock post", async () => 
  {
    // Create modified post from post stub
    const modifiedMockPost = mockReply;
    
    // Change the auther name 
    modifiedMockPost.author = "Dwight Schrute";
    
    // Update the mockPost using the service 
    await replyService.update(mockReplyID, modifiedMockPost); 
    
    // Fetch the modified mock post expecting the author names to match 
    return expect(replyService.findOne(mockReplyID)).resolves
          .toMatchObject(modifiedMockPost);

  });

  test("Delete new Post", async () => 
  {
    // Delete the mock post 
    await replyService.deleteOne(mockReplyID);

    // Expect the request for the mockPost to fail
    return expect(replyService.findOne(mockReplyID)).rejects
          .toBeInstanceOf(BadRequestException);
  });

  test.todo("Delete the additional mock tests added to the database");
});
