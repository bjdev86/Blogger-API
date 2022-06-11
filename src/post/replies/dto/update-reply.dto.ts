/**
 * UpdateReplyDto
 */
export class UpdateReplyDto
{
    author: string; 
    date: Date; 
    body: string; 
    path: string;
    replies?: UpdateReplyDto[] = [];
}
