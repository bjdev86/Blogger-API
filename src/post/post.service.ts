import { Injectable }         from '@nestjs/common';
import { CreatePostDto }      from './dto/create-post.dto';
import { UpdatePostDto }      from './dto/update-post.dto';
import { InjectModel }        from '@nestjs/mongoose';
import { Model }              from 'mongoose';
import { PostDocument }       from './schemas/post.schema'; 
import { Post }               from './entities/post.entity';
import mongoose               from 'mongoose';

@Injectable()
export class PostService
{
  // Constructor to setup the the mongoose module injection 
  constructor( @InjectModel(Post.name) private postModel: Model<PostDocument>){}

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

  update(id: number, updatePostDto: UpdatePostDto)
  {
    return `This action updates a #${id} post`;
  }

  remove(id: string)
  {
    return this.postModel.deleteOne({_id: mongoose.Types.ObjectId.createFromHexString(id)});
  }
}
