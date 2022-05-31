import * as mongoose from 'mongoose'
import { Post } from '../entities/post.entity';
import { Document } from 'mongoose';

// Export the the 'PostDocument' type for use by service classes
export type PostDocument = Post & Document; 

// export class Post
// {
//     author: String;
//     date: Date; 
//     body: String; 
//     replies: [];
// }

// The schema for the posts 
export const PostSchema = new mongoose.Schema( 
{
    author: String,
    date: Date, 
    body: String, 
    // Array of replies to the prior post 
    replies: [typeof Post]
});
