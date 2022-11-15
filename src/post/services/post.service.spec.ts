import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Schema } from 'mongoose';
import { CreatePostDtoStub } from '../../../test/createPost.dto.stub';
import { PostModel } from '../entities/post.entity';
import { BadRequestException } from '../exceptions/badrequest.exception';
import { ReplyModel } from '../replies/entities/reply.entity';
import { ReplySchema } from '../replies/schemas/reply.schema';
import { Name as PostModelName, PostModelType } from '../schemas/post.schema';
import { PostService } from './post.service';

// Create a mock post to use in this test suite
const mockPost = CreatePostDtoStub(); 
const mockPosts = 
[
  {
    author: "Jim Halpert",
    date: Date.now(), 
    body: "Bears, beets, battle stare Galactica", 
    replies: [ReplySchema]
  },
  {
    author: "Dwight Schrute",
    date: Date.now(), 
    body: "Michael!", 
    replies: [ReplySchema]
  }
];

// Test suite for post serivce unit tests. 
describe('PostService', () =>
{
  // Local Variable Declaration 
  let mongoConnection: Connection;
  let postModel: PostModelType;
  let mockPostID: string; 
  let postService: PostService;
  let model: PostModelType; 

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
       //controllers: [PostController],
       providers: 
       [
         PostService,
         {
           provide: getModelToken(PostModelName), useValue: postModel
         },
       ],  
     }).compile();
 
     // Get the post controller to use in the tests 
     postService = module.get<PostService>(PostService);
     model = module.get<PostModelType>(getModelToken('Post'));
   });

  afterAll(async () => 
  {
    // Close the Mongo connection to the database
    await mongoConnection.close();  
  });

 /*-------------------------- BEGIN TEST SUITE -------------------------------*/
  test('should be defined', () =>
  {
    expect(postService).toBeDefined();
  });

  test("Create a new post", async () => 
  {
    // Add a new post using the service and save the id created  
    mockPostID = await postService.create(mockPost);

    // Make sure post ID is defined. 
    return expect(mockPostID).toBeDefined();
  });

  test.todo("Add a group of posts");

  test("Read the mock post from the database", async () => 
  {
    /* Fetch the mockpost from the database and make sure it matches the 
     * original */
    return expect (postService.findOne(mockPostID)).resolves
          .toMatchObject(mockPost);
  });

  test.todo("Read all the group of mock posts added to the database"); 

  test("Update mock post", async () => 
  {
    // Create modified post from post stub
    const modifiedMockPost = mockPost;
    
    // Change the auther name 
    modifiedMockPost.author = "Dwight Schrute";
    
    // Update the mockPost using the service 
    await postService.update(mockPostID, modifiedMockPost); 
    
    // Fetch the modified mock post expecting the author names to match 
    return expect(postService.findOne(mockPostID)).resolves
          .toMatchObject(modifiedMockPost);

  });

  test("Delete new Post", async () => 
  {
    // Delete the mock post 
    await postService.remove(mockPostID);

    // Expect the request for the mockPost to fail
    return expect(postService.findOne(mockPostID)).rejects
          .toBeInstanceOf(BadRequestException);
  });

  test.todo("Delete the additional mock tests added to the database");
});

