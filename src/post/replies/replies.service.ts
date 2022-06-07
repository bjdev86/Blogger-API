import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NAME as PostName, Post } from '../entities/post.entity';
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
   * todo: What if you used the Repy and ReplyModelType for the Model
   */
  // Construction to recieve the Mongoose Model token 
  constructor(@InjectModel(PostName) private postModel: 
                                     Model<Post, PostModelType>) {}

  /**
  * 
  * @param createReplyDTO 
  * @returns 
  * 
  * TODO: Use hooks/middleware to append new id to path
  */
  async create ( createReplyDTO: CreateReplyDto )
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
    
    // Set new posts id and add it to the path
    createReplyDTO._id = new Types.ObjectId()
    createReplyDTO.path += RPLY_PATH_DELIM + createReplyDTO._id.toHexString();

    // Push the reply data passed on the previous post
    replyPost.replies.push(createReplyDTO); 
    
    // Save the addition and return 
    return blogPost.save();
  }

  /**
   * 
   * @param path 
   * 
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

  async update( updateReplyDTO: UpdateReplyDto )
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
    
    // Save the addition and return 
    return blogPost.save();
  }

  async deleteOne( path: string)
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
    
    // Save the addition and return 
    return blogPost.save();
  }
}
