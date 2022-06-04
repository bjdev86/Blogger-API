import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Post } from '../entities/post.entity';
import { PostDocument } from '../schemas/post.schema';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import mongoose from 'mongoose';

// Module constants 
const RPLY_PATH_DELIM = '\\';

@Injectable()
export class RepliesService 
{
  // Construction to recieve the Mongoose Model token 
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create ( createReplyDTO: CreateReplyDto )
  {
    // Local Variable Declaration 
    let blogPost: PostDocument = undefined, newReply = {}, i: any = 0; 
    let replyIDs: string[] = [], replyPath: string = '', 
        arrayRefs: Array<Record<string, unknown>> = [];

    // Capture the path from the body 
    const { path } = createReplyDTO; 

    // Tokenize the path over path delimiter 
    replyIDs = path.split(RPLY_PATH_DELIM);
    
    // Fetch the reply to update from the database
    blogPost = await this.postModel.findById(replyIDs.shift());
    
    // Generate the reply path from the reply post ids 
   for (const id of replyIDs) 
   {
     replyPath += `replies.$[reply${i}].`;

     // Build the references Mongo will use to traverse the reply chain
     arrayRefs.push({ [`reply${i++}._id`]: id }); 
   }
   
   // Create new ObjectId for new reply 
   createReplyDTO._id = new mongoose.Types.ObjectId(); 

   // Append this new reply id to the path of ids
   createReplyDTO.path = `${ path }${ RPLY_PATH_DELIM }${ createReplyDTO._id }`;

   // Bundle path and dto into one update object 
   newReply[replyPath + 'replies'] = createReplyDTO; 

   // Commit the reply to the database return the commit result 
   return blogPost.updateOne({ $push: newReply }, 
                             { arrayFilters: arrayRefs });
  }
  

  async update( updateReplyDTO: UpdateReplyDto )
  {
    // Local Variable Delcaration 
    let blogPost: PostDocument = undefined;
    let replyPosts: string[] = undefined; 
    let replyPath = '', i: any = 0; 
    const setters = {}, postFilters = [];

    // Tokenize the path over path delimiter 
    replyPosts = updateReplyDTO.path.split(RPLY_PATH_DELIM);

    // The path is no longer needed
   //delete updateReplyDTO.path;
    
    // Fetch the reply to update from the database
    blogPost = await this.postModel.findById(replyPosts.shift());
    
    /* Trasverse down the reply tree recording the path and setting the array 
     * filters */
    for (const replyPost of replyPosts)
    {
        replyPath += `replies.$[reply${i}].`;
        postFilters.push({ [`reply${i++}._id`]: replyPost });
    }

    // Build query setters 
    for (const [key, val] of Object.entries(updateReplyDTO))
    {
        setters[`${replyPath}${key}`] = val;
    }

    // Commit the update, return result 
    return await blogPost.updateOne(
                 { $set: setters }, 
                 { arrayFilters: postFilters });
  }
}
