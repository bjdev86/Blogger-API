
export class UpdatePostDto
{
    author: string; 
    date: Date; 
    body: string; 
    replies?: UpdatePostDto[] = [];
}
