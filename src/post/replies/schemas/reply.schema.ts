import { Model, Schema, Types } from 'mongoose';
import { ReplyModel } from '../entities/reply.entity';

/* Type to use for the TMthodsAndOverrides parameter in the model type 
 * definition */
type ReplyDocumentOverrides = 
{
    replies: Types.DocumentArray<ReplyModel>;
}; 

// The type used to define the model for a reply document
type ReplyModelType = Model<ReplyModel, unknown, ReplyDocumentOverrides>;

type ReplySubDocument = ReplyModel & ReplyModelType; 

// Define the reply schema 
const ReplySchema = new Schema<ReplyModel, ReplyModelType>(
{
    author: String, 
    date: Date, 
    body: String, 
    path: String, 
});

// Add 'replies' schema type to ReplySchema
ReplySchema.add({replies: [ReplySchema]});

/* Export the schema and the mdoel type for use in model and document 
 * instansiation */
export { ReplySchema, ReplyModelType, ReplySubDocument };
