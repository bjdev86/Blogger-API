import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { PostModel } from "../entities/post.entity";
import { CreateReplyDto } from "../replies/dto/create-reply.dto";
import { ReplyModel } from "../replies/entities/reply.entity";

/**
 * The author of the blog post
 */
export class CreatePostDto implements PostModel
{
    author: string; 
    date: Date; 
    body: string; 

    @ApiProperty({ type: () => [CreateReplyDto] })
    replies?: Types.DocumentArray<ReplyModel>;
    
}
