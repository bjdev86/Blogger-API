/* eslint-disable prettier/prettier */

import { Types } from "mongoose";
import { CreateReplyDto } from "../src/post/replies/dto/create-reply.dto";

// eslint-disable-next-line prettier/prettier
export const CreateReplyDtoStub = (): CreateReplyDto =>
{
    return {
        _id: new Types.ObjectId(),
        author: "Jim Halbert",
        body: "Bears, Beets, Battle Star Gilatica",
        date: new Date(),
        path: "",
    };
};
