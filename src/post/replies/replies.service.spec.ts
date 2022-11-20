import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Schema } from 'mongoose';
import { CreateReplyDtoStub } from '../../../test/createReply.dto.stub';
import { CreateReplyDto } from './dto/create-reply.dto';
import { PostModel } from '../entities/post.entity';
import { Name as PostModelName, PostModelType } from '../schemas/post.schema';
import { PostService } from '../services/post.service';
import { ReplyModel } from './entities/reply.entity';
import { RepliesService } from './replies.service';

// Test suite for post serivce unit tests. 
describe('Reply Service', () =>
{
  // Local Variable Declaration 
  let mongoConnection: Connection;
  let mockReplyPath: string; 
  let mockPostID: string;
  let replyService: RepliesService;
  let postService: PostService;

  let postModel: PostModelType;let mockReply:CreateReplyDto = CreateReplyDtoStub();

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
    postModel = mongoConnection.model<PostModel, PostModelType>( 
      PostModelName, new Schema<PostModel, PostModelType>(
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
      providers: 
      [
        {
          provide: getModelToken(PostModelName), 
          useValue: postModel,
        },
        PostService,
        RepliesService,
      ],  
    }).compile();

    // Get the reply service and reply model to use in the tests 
    replyService = module.get<RepliesService>(RepliesService);

    // Get the post service to use these tests 
    postService = module.get<PostService>(PostService); 

    // Create a mock post to which mock replies will be added to in the database
    mockPostID = await postService.create(
    {
      author: "Michael Scott",
      body: "Dwight, assistant to the regional manager.",
      date: new Date(),
    });
  });

  afterAll(async () => 
  {
    // Delete mock post (clean up)
    await postService.remove(mockPostID); 

    // Close the Mongo connection to the database
    await mongoConnection.close();  
  });

 /*-------------------------- BEGIN TEST SUITE -------------------------------*/
  test('should be defined', () =>
  {
    expect(replyService).toBeDefined();
  });

  test("Create a new reply to mock post", async () => 
  {
    // Set the path for the mock reply 
    mockReply.path = `${mockPostID}`;

    // Add the mock reply.  
    mockReply = ((await replyService.create(mockReply)));

    // Save the path to that new reply
    mockReplyPath = mockReply.path;

    // Make sure post ID is defined. 
    return expect(mockReplyPath).toBeDefined();
  });

  test.todo("Add a group of replies to a post");

  test("Read the mock reply from the mock post", async () => 
  {
    /* Fetch the mockpost from the database and make sure it matches the 
     * original */
    return expect (replyService.findOne(mockReplyPath)).resolves
          .toMatchObject(mockReply);
  });

  test.todo("Read all the group of mock replies added to the database"); 

  test("Update mock reply", async () => 
  {
    // Create modified post from post stub
    const modifiedMockReply = mockReply;
    
    // Change the auther name 
    modifiedMockReply.author = "Dwight Schrute";
    
    // Update the mockPost using the service 
    await replyService.update(modifiedMockReply); 
    
    // Fetch the modified mock post expecting the author names to match 
    return expect(replyService.findOne(mockReplyPath)).resolves
          .toMatchObject(modifiedMockReply);

  });

  test("Delete mock reply", async () => 
  {
    // Delete the mock post 
    await replyService.deleteOne(mockReplyPath);

    // Expect the request for the mockPost to fail
    return expect(replyService.findOne(mockReplyPath)).resolves.toBeNull();
  });

  test.todo("Delete the additional (group) mock tests added to the database");
});
