import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { NAME as PostName, PostModel } from './entities/post.entity';
import { BadRequestException } from './exceptions/badrequest.exception';
import { PostModelType } from './schemas/post.schema';


/**
 * Class to define the behavior for the Posts API. This class simply defines 
 * CRUD functions for blog posts. 
 * 
 * @todo Is findOneAnd*[Update | Delete | Replace] faster and more efficient 
 *       than finding the document and the preforming a delete operation on 
 *       it? Is it one single operation or is it two operations against the 
 *       database?   
 */
@Injectable()
export class PostService
{
  // Constructor to setup the the mongoose module injection 
  constructor( @InjectModel( PostName ) private postModel: 
                             Model<PostModel, PostModelType>){}

  async create( createPostDto: CreatePostDto ): Promise<void>
  {
    // Create a new document to add in 
    const newPost = new this.postModel(createPostDto);
    
    // Save the new post to persistence
    newPost.save({ validateBeforeSave: false });
  }

  async findAll(): Promise<any>
  {
    return this.postModel.find({});
  }

  /**
   * Function to fine a single post document in the database and return it. 
   * 
   * @param id The unique hex string id for a specific post in the database.
   * @returns The post identified by <code>id</code>
   */
  async findOne( id: string ): Promise<any>
  {
    // Local Variable Declaration 
    let post: any = undefined;
    
    // Attempt to fetch the post from persistence
    post = await this.postModel.findById(id);
    
    // Return the post if it is found  
    if( post ) 
    {
      return post;
    }
    else 
    {
      // Throw an error indicating the post record was not found
      throw new BadRequestException(
      {
        objectId: `ID ${id} was not found in the db`
      }); 
    }
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
    post = await this.findOne(id);   

    // Update the post with the incoming data from the dto
    for ( const [key, val] of Object.entries( updatePostDto ))
    {
      post[key] = val;
    }

    // Save the updated doucment, and return the updated version 
    return post.save();
  }

  /**
   * Function to preform the delete of a blog post from the database.
   * 
   * @param id The id of the post to be deleted in the database
   * 
   * @returns Object indicating how many records were deleted.
   * 
   * @todo Not sure if this is the right usage of "deleteOne", but it is 
   *       working. The last search didn't reveal anything. Using it now for 
   *       consistencey.
   */
  async remove( id: string ): Promise<void>
  {
    // Find and delete the post if it exists 
    const post = await this.findOne(id);
    await post.deleteOne(); 
    //await this.postModel.deleteOne({ _id: post.id });
    // this.postModel.findByIdAndDelete(id, (error, post) => 
    // {
    //   if (!post)
    //   {
    //     throw new BadRequestException({ id: "Post not found." })
    //   }
    // });
  }
}
