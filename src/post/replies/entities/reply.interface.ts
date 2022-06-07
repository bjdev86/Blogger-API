import { Types } from 'mongoose';

export const REPLY_NAME = 'Reply'; 

export interface Reply 
{
    author: string;  
    date: Date; 
    body: string; 
    path: string;
    replies: Types.DocumentArray<Reply>;
}
