import { CreateReplyDto } from "../replies/dto/create-reply.dto";

/**
 * The author of the blog post
 */
export class CreatePostDto 
{
    author: string; 
    date: Date; 
    body: string; 
    replies?:CreateReplyDto[] = [];
}
