import { Model, Schema, Types } from 'mongoose';
import { Post } from '../entities/post.entity';
import { Reply } from '../replies/entities/reply.interface';
import { ReplySchema } from '../replies/schemas/reply.schema';

/* TMthodsAndOverrides generic type enforcing that replies will be a Mongoose 
 * Doc Array */
type PostDocumentProps = 
{ 
    replies: Types.DocumentArray<Reply>; 
};

// Create Model type for PostDocument models
export type PostModelType = Model<Post, {}, PostDocumentProps>; 

export type PostDocument = Post & PostModelType; 

// The schema for the posts 
export const PostSchema = new Schema<Post, PostModelType>( 
{
    author: String,
    date: Date, 
    body: String, 
    replies: [ReplySchema]
});

// Export the schema and the model type for model and document instansiation 
// export {PostSchema, PostModelType};
