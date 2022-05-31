import * as mongoose from 'mongoose'
import { Post } from '../entities/post.entity';

// The schema for the posts 
export const PostSchema = new mongoose.Schema(
{
    author: String,
    date: Date, 
    body: String, 
    // Array of replies to the prior post 
    replies: [typeof Post]
});
