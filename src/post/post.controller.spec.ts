import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Schema } from 'mongoose';
import { PostModel } from './entities/post.entity';
import { BadRequestException } from './exceptions/badrequest.exception';
import { PostController } from './post.controller';
import { ReplyModel } from './replies/entities/reply.entity';
import { Name as PostModelName, PostModelType } from './schemas/post.schema';
import { PostService } from './services/post.service';

/**
 * 
 * https://betterprogramming.pub/testing-controllers-in-nestjs-and-mongo-with-jest-63e1b208503c
 */
// Context for the testing the Post Controller
describe('PostController', () =>
{
  
  // Local Variable Declaratoin (dependencies)
  let controller: PostController;
  let mongoConnection: Connection;
  let postModel: PostModelType;
  let mockPostID: string; 

  // Mock post 
  const mockPost =
  {
    author: 'Jim Halpert',
    date: new Date(),
    body: 'Bears, beets, Battlestar Galactica'
    //replies: [],
  };

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
      controllers: [PostController],
      providers: 
      [
        PostService,
        {
          provide: getModelToken(PostModelName), useValue: postModel
        }
      ],  
    }).compile();

    // Get the post controller to use in the tests 
    controller = module.get<PostController>(PostController);
  });

  afterAll(async () => 
  {
    // Close the Mongo connection to the database
    await mongoConnection.close();  
  });

  /*------------------------- BEGIN TEST SUITE -------------------------------*/
  
  // Simple test to make sure the postController is defined
  test('should be defined', () =>
  {
    return expect(controller).toBeDefined();
  });

  // Test to see if a new post can be inserted into the database
  test('Add new post to db', async () => 
  {
    expect.assertions(1);

    // Put the mock post in the database using the controller
    mockPostID = await controller.create(mockPost);

    // See if the mockPostID was present 
    return expect(mockPostID).not.toBeUndefined();
  });

  test("Read/Retrive the mock post",async () => 
  {
    // Make sure the mock post can be read from the database 
    return expect(controller.findOne(mockPostID))
          .resolves.toMatchObject(mockPost);  
  });

  test("Update The New Post, successful", async () => 
  {
    // Modify the mock post 
    mockPost.author = "Dwight Schurte"; 

    // Make sure the update function is actually called
    expect.assertions(1);
   
    // Update the post in the database using the controller 
    await controller.update(mockPostID, mockPost);
   
    // Get the modified post back to check it.
    const updatedPost = await controller.findOne(mockPostID); 

    // See modified portion of the mock matches the actual updated one
    return expect(updatedPost.author).toBe(mockPost.author);
  });

  test("Delete mock post from the database", async() => 
  {
    // Delete the mock post by id 
    await controller.remove(mockPostID);

    // Expect the post with the mock postID to be returned as null
    return expect(controller.findOne(mockPostID)).rejects
          .toBeInstanceOf(BadRequestException);
  });

  test("Delete mock post from the database", async() => 
  {
    // Delete the mock post by id 
    await controller.remove(mockPostID);

    // Expect the post with the mock postID to be returned as null
    return expect(controller.findOne(mockPostID)).rejects
          .toBeInstanceOf(BadRequestException);
  });
});
