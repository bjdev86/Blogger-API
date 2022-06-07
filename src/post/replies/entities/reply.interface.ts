import { Types } from 'mongoose';

export interface Reply 
{
    author: string;  
    date: Date; 
    body: string; 
    path: string;
    replies: Types.DocumentArray<Reply>;
}
