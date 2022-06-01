import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostDocument } from './schemas/post.schema';
import { Post } from './entities/post.entity';
import { UpdateReplyDto } from './replies/dto/update-reply.dto';

// Module constants 
const RPLY_PATH_DELIM = '\\';

@Injectable()
export class RepliesService 
{
  // Construction to recieve the Mongoose Model token 
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async update( updateDTO: UpdateReplyDto )
  {
    // Local Variable Delcaration 
    let reply: PostDocument = undefined;
    let replyPosts: string[] = undefined; 
    let replyPath = ''; 
    const setters = {}, postFilters = [];

    // Tokenize the path over path delimiter 
    replyPosts = updateDTO.path.split(RPLY_PATH_DELIM);

    delete updateDTO.path;
    
    // Fetch the reply to update from the database
    reply = await this.postModel.findById(replyPosts.shift());
    
    /* Trasverse down the reply tree recording the path and setting the array 
     * filters */
    for (const replyPost of replyPosts)
    {
        replyPath += 'replies.$[reply].';
        postFilters.push({ 'reply._id': replyPost });
    }

    // Build query setters 
    for (const [key, val] of Object.entries(updateDTO))
    {
        setters[`${replyPath}${key}`] = val;
    }

    // Commit the update, return result 
    return await reply.updateOne(
    { $set: setters }, 
    { arrayFilters: postFilters });
  }
}
