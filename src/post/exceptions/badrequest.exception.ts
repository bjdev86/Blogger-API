import { HttpException, HttpStatus } from "@nestjs/common";
/**
 * Class to define a custom 'BadRequestException' for invalid record data or 
 * non-existant records in the database.
 */
export class BadRequestException extends HttpException
{
    // Private Class members 
    private _reasons: Record<string, unknown>;

    
    // Class constructor, butilds exception with option validation error object
    constructor( reasons?: Record<string, unknown> )
    {
        super ( 
            {
                name: 'BAD REQUEST',
                message: "Request malformed or record(s) not found.",
            }, 
            HttpStatus.BAD_REQUEST );

            // Set the reasons property if supplied
            this._reasons = reasons || undefined
    }
    
    /**
     * Funtion to access private data member _reasons.
     */
    public get reasons() { return this._reasons; }
}
