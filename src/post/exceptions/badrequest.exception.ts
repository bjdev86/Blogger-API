import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * Class to define a custom 'BadRequestException' for invalid record data or 
 * non-existant records in the database.
 */
export class BadRequestException extends HttpException
{
    constructor ()
    {
        super( 
        {
            name: 'BAD REQUEST',
            message: "Request malformed or record(s) not found.",
        }, 
        HttpStatus.BAD_REQUEST );
    }
}
