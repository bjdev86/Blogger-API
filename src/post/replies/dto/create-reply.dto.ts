import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import { ReplyModel } from '../entities/reply.entity';

export class CreateReplyDto implements ReplyModel
{
    _id: mongoose.Types.ObjectId;
    author: string; 
    date: Date; 
    body: string;
    path: string;

    @ApiProperty({ type: () => CreateReplyDto })
    replies?: Types.DocumentArray<ReplyModel>;
}

