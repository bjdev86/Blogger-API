import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostModelType } from 'src/post/schemas/post.schema';
import { NAME, PostModel } from "../entities/post.entity";
import { BadRequestException } from "../exceptions/badrequest.exception";

/**
 * 
 * todo Find out the type of the return document.
 */
@Injectable()
export class UpdateDtoValidationPipe implements 
                                    PipeTransform<PostModel>
{
    /* Injection constructor to recieve and use the mongoose model singleton token. */
    constructor( @InjectModel( NAME ) private postModel: Model<PostModel, 
                                                            PostModelType> ) {}
    
    async transform( bodyDTO: PostModel, metadata: ArgumentMetadata ): 
                                                            Promise<PostModel> 
    {
        try
        { 
            /* Validate the body dto passed against the schema, but only 
             * validate the properties in the DTO. */ 
            await this.postModel.validate( bodyDTO, Object.keys( bodyDTO ));
            
            // Return the validated bodyDTO
            return await Promise.resolve( bodyDTO ); 
        }
        catch ( error )
        {
           // Local Variable Declaration
           const valErrors = {}; 

           // Formulate the reasons the validation failed 
           for( const [path, details] of Object.entries<any> ( error.errors ))
           { 
               valErrors[path] = details.message; 
           } 
           
           // Throw a BadRequestException with the validation errors
           throw new BadRequestException( valErrors );
        }
    }
}
