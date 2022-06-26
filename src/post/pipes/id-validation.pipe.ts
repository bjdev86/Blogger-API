import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { BadRequestException } from '../exceptions/badrequest.exception';

@Injectable()
export class IdValidationPipe implements PipeTransform <string>
{
  transform( id: string, metadata: ArgumentMetadata ) 
  {
    // Create ObjectId SchemaType in doing so test the value 
    if( !Types.ObjectId.isValid(id) )
    {
      throw new BadRequestException(
      { 
        id: `id: ${id} is invalid. IDs can be 24 character hex strings.`
      });
    }

    return id;
  }
}
