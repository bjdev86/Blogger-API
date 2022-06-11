import { Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { NAME as PostName, Post } from './entities/post.entity';
import { BadRequestException } from './exceptions/badrequest.exception';
import { PostModelType } from './schemas/post.schema';


/**
 * Class to define the behavior for the Posts API. This class simply defines 
 * CRUD functions for blog posts. 
 */
@Injectable()
@UseFilters( BadRequestException )
export class PostService
{
  // Constructor to setup the the mongoose module injection 
  constructor( @InjectModel( PostName ) private postModel: 
                             Model<Post, PostModelType>){}

  async create( createPostDto: CreatePostDto ): Promise <Document>
  {
    // Create a new document to add in 
     const newPost = new this.postModel(createPostDto);
    
    // Save the new post to persistence
    return newPost.save();
  }

  async findAll(): Promise<any>
  {
    return this.postModel.find({}).exec();
  }

  async findOne( id: string ): Promise<any>
  {
    return this.postModel.findById(id).exec();
  }

  /**
   * 
   * @param id 
   * @param updatePostDto 
   * @returns 
   */
  async update(id: string, updatePostDto: UpdatePostDto): Promise<Document>
  {
    // Local Variable Declaration 
    let post: any = undefined;

    // Find the document to be edited 
    post = await this.postModel.findById( id ).exec();
    
    // Return the null post if null was returned for query operation.  
    if (post === null)
    {
      return post; 
    }

    // Update the post with the incoming data from the dto
    for ( const [key, val] of Object.entries(updatePostDto) )
    {
      post[key] = val;
    }

    // Save the updated doucment, and return the updated version 
    return await post.save();
  }

  /**
   * Function to preform the delete of a blog post from the database.
   * 
   * @param id The id of the post to be deleted in the database
   * 
   * @returns Object indicating how many records were deleted.
   */
  async remove( id: string )
  {
    // Capture the delete count to ensure deletion took place
    return await this.postModel.deleteOne(
    {
      _id: mongoose.Types.ObjectId.createFromHexString(id)
    });
  }
}
