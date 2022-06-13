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

// The schema for the posts 
export const PostSchema = new Schema<PostModel, PostModelType>( 
{
    author: String,
    date: Date, 
    body: String, 
    replies: [ReplySchema]
});

// Export the schema and the model type for model and document instansiation 
// export {PostSchema, PostModelType};
