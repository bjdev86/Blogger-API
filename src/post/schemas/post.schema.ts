import { Model, Schema, Types } from 'mongoose';
import { PostModel } from '../entities/post.entity';
import { ReplyModel } from '../replies/entities/reply.entity';
import { ReplySchema } from '../replies/schemas/reply.schema';

/* TMthodsAndOverrides generic type enforcing that replies will be a Mongoose 
 * Doc Array */
type PostDocumentProps = 
{ 
    replies: Types.DocumentArray<ReplyModel>; 
};

// Create Model type for PostDocument models
export type PostModelType = Model<PostModel, {}, PostDocumentProps>; 

export type PostDocument = PostModel & PostModelType; 

/** 
 * The schema for the posts
 * 
 * @todo Add custom, default error message
 */ 
export const PostSchema = new Schema<PostModel, PostModelType>( 
{
    author: 
    { 
        type: String, required: true, validate: 
        { 
            validator:  (value: string) => !( /^\d*$/.test( value )),
            message: 'Author names must be alphanumeric and cannot be soely' +  
                     ' numeric.',
        }
    },
    date: { type: Date, required: true }, 
    body: { type: String, required: true },
    replies: { type: [ReplySchema], required: false }
});

