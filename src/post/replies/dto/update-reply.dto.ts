import { ApiProperty } from "@nestjs/swagger/dist/decorators/";
import { Types } from "mongoose";
import { ReplyModel } from "../entities/reply.entity";
import { CreateReplyDto } from "./create-reply.dto";

/**
 * UpdateReplyDto
 */
export class UpdateReplyDto
{
    author: string; 
    date: Date; 
    body: string; 
    path: string;

    @ApiProperty({ type: () => [CreateReplyDto] })
    replies?: Types.DocumentArray<ReplyModel>;
}
