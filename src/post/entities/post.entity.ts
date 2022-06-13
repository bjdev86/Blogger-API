import { Types } from 'mongoose';
import { ReplyModel } from "../replies/entities/reply.entity";

export interface PostModel
{
    author: string;  
    date: Date; 
    body: string; 
    replies?: Types.DocumentArray<ReplyModel>;
}

export const NAME = 'Post';
