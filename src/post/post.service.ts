import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument } from './schemas/post.schema';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService
{
  // Constructor to setup the the mongoose module injection 
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  create(createPostDto: CreatePostDto)
  {
    // Create a new document to add in 
    const newPost = new this.postModel(createPostDto);

    // Save the new post to persistence
    return newPost.save();
  }

  findAll() 
  {
    return this.postModel.find({});
  }

  findOne(id: string)
  {
    return this.postModel.findById(id);
  }

  /**
   * 
   * @param id 
   * @param updatePostDto 
   * @returns 
   */
  async update(id: string, updatePostDto: UpdatePostDto)
  {
    // Local Variable Declaration 
    let post: PostDocument = undefined;

    // Find the document to be edited 
    post = await this.postModel.findById(id).exec();

    // Update the post with the incoming data from the dto
    for (const [key, val] of Object.entries(updatePostDto)) post[key] = val;

    // Save the updated doucment, and return the updated version 
    return await post.save();
  }

  /**
   * Function to preform the delete of a blog post from the database.
   * 
   * @param id The id of the post to be deleted in the database
   * @returns The success or failure of the delete from the database.
   */
  remove(id: string)
  {
    return this.postModel.deleteOne(
      {
        _id: mongoose.Types.ObjectId.createFromHexString(id)
      });
  }
}
