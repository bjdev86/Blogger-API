import { Reply } from "../replies/entities/reply.interface";
import { Types } from 'mongoose';

export interface Post
{
    author: String;  
    date: Date; 
    body: String; 
    replies: Types.DocumentArray<Reply>;
}

export const NAME = 'Post';
