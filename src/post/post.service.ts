import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { NAME as PostName, Post } from './entities/post.entity';
import { PostModelType } from './schemas/post.schema';

@Injectable()
export class PostService
{
  // Constructor to setup the the mongoose module injection 
  constructor( @InjectModel( PostName ) private postModel: 
                             Model<Post, PostModelType>) 
  {}

  create( createPostDto: CreatePostDto )
  {
    // Create a new document to add in 
     const newPost = new this.postModel(createPostDto);
    //const newPost = new this.model(createPostDto);
    
    // Save the new post to persistence
    return newPost.save();
  }

  findAll() 
  {
    return this.postModel.find({});
  }

  findOne( id: string )
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
    let post: any = undefined;

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
