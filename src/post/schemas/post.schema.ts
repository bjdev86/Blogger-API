import * as mongoose from 'mongoose'
import { Post } from '../entities/post.entity';
import { Document } from 'mongoose';

// Export the the 'PostDocument' type for use by service classes
export type PostDocument = Post & Document; 

// The schema for the posts 
const PostSchema = new mongoose.Schema( 
{
    _id: {type: mongoose.Types.ObjectId, required: true },
    author: String,
    date: Date, 
    body: String, 
    path: {type: String, required: true},
}, 
{id: true});

// Add replies to the schema
PostSchema.add({ replies: [PostSchema] });
// PostSchema.add({ comments: new mongoose.Types.ArraySubdocument
//                                               < typeof PostSchema < mongoose.Model<PostSchema>>() });

export default PostSchema;
