import mongoose from 'mongoose';

export class CreateReplyDto
{
    _id: mongoose.Types.ObjectId;
    author: string; 
    date: Date; 
    body: string;
    path: string;
    replies?: CreateReplyDto[] = [];
}
