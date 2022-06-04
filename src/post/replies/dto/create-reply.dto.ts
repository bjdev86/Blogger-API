import mongoose from 'mongoose';

export class CreateReplyDto
{
    _id: mongoose.Types.ObjectId;
    author: string; 
    date: Date; 
    body: string; 
    replies: [typeof CreateReplyDto];
    comments: mongoose.Types.DocumentArray<typeof CreateReplyDto>;
    path: string;
}
