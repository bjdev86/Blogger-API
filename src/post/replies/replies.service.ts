import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NAME as PostName, PostModel } from '../entities/post.entity';
import { PostModelType } from '../schemas/post.schema';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';


// Module constants 
const RPLY_PATH_DELIM = '\\';

@Injectable()
export class RepliesService 
{
  /**
   * 
   * @param postModel 
   *
   */
  // Construction to recieve the Mongoose Model token 
  constructor(@InjectModel(PostName) private postModel: 
                                     Model<PostModel, PostModelType>) {}

  /**
  * 
  * @param createReplyDTO 
  * @returns 
  * 
  */
  async create ( createReplyDTO: CreateReplyDto ): Promise<any>
  {
    // Local Variable Declaration 
    let blogPost: any = undefined, replyPost: any = undefined; 
    let replyIDs: string[] = [];

    // Capture the path from the body 
    const { path } = createReplyDTO; 

    // Tokenize the path over path delimiter 
    replyIDs = path.split(RPLY_PATH_DELIM);
    
    // Fetch the reply to update from the database
    blogPost = replyPost = (await this.postModel.findById(replyIDs.shift()));
    
    // Iterate down the reply chain looking for the replies 
    for (const id of replyIDs)
    {
      replyPost = replyPost.replies.id(id);
    }
    
    // Set new post's id and add it to the path
    createReplyDTO._id = new Types.ObjectId()
    createReplyDTO.path += RPLY_PATH_DELIM + createReplyDTO._id.toHexString();

    // Push the reply data passed on the previous post
    replyPost.replies.push(createReplyDTO); 
    
    // Save the additional reply 
    await blogPost.save();

    // Return the path to the reply just created and added 
    return createReplyDTO;
  }

  /**
   * 
   * @param path 
   * 
   */
  async findOne( path: string )
  {
    // Local Variable Declaration 
    let replyPost: any = undefined; 
    let replyIDs: string[] = [];

    // Tokenize the path over path delimiter 
    replyIDs = path.split(RPLY_PATH_DELIM);
    
    // Fetch the reply to update from the database
    replyPost = (await this.postModel.findById(replyIDs.shift()));
    
    // Iterate down the reply chain looking for the replies 
    for (const id of replyIDs)
    {
      replyPost = replyPost.replies.id(id);
    }

    // Push the reply data passed on the previous post
    return replyPost;
  }

  async update( updateReplyDTO: UpdateReplyDto ): Promise<any>
  {
    // Local Variable Declaration 
    let blogPost: any = undefined, replyPost: any = undefined; 
    let replyIDs: string[] = [];

    // Capture the path from the body 
    const { path } = updateReplyDTO; 

    // Tokenize the path over path delimiter 
    replyIDs = path.split(RPLY_PATH_DELIM);
    
    // Fetch the reply to update from the database
    blogPost = replyPost = (await this.postModel.findById(replyIDs.shift()));
    
    // Iterate down the reply chain looking for the replies 
    for (const id of replyIDs)
    {
      replyPost = replyPost.replies.id(id);
    }
    
    // Update the changed properties passed
    for (const [key, val] of Object.entries( updateReplyDTO ))
    {
      replyPost[key] = val;
    }
    
    // Save the update and return 
    await blogPost.save();

    // Return the updated reply post
    return replyPost;
  }

  async deleteOne(path: string): Promise<any>
  {
    // Local Variable Declaration 
    let blogPost: any = undefined, replyPost: any = undefined; 
    let replyIDs: string[] = [];

    // Tokenize the path over path delimiter 
    replyIDs = path.split(RPLY_PATH_DELIM);
    
    // Fetch the reply to update from the database
    blogPost = replyPost = (await this.postModel.findById(replyIDs.shift()));
    
    // Iterate down the reply chain looking for the replies 
    for (const id of replyIDs)
    {
      replyPost = replyPost.replies.id(id);
    }

    // Delete the reply post
    replyPost.remove();
    
    // Save the removal 
    await blogPost.save();

    // Return the deleted reply post 
    return replyPost;
  }
}
