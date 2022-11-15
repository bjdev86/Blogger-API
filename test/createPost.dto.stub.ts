/* eslint-disable prettier/prettier */
import { CreatePostDto } from '../src/post/dto/create-post.dto';

// eslint-disable-next-line prettier/prettier
export const CreatePostDtoStub = (): CreatePostDto =>
{
    return {
        author: "Jim Halbert",
        body: "Bears, Beets, Battle Star Gilatica",
        date: new Date(),
        
    };
};
