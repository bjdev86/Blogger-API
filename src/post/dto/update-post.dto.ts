import { ApiPropertyOptional } from "@nestjs/swagger";
import { Types } from "mongoose";
import { PostModel } from "../entities/post.entity";
import { ReplyModel } from "../replies/entities/reply.entity";

export class UpdatePostDto implements PostModel
{
    author: string; 
    date: Date; 
    body: string; 

    @ApiPropertyOptional({type: Types.DocumentArray})
    replies?: Types.DocumentArray<ReplyModel>;
}
