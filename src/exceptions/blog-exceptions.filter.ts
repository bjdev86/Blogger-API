import { ArgumentsHost, Catch, ExceptionFilter, 
         HttpException, Logger } from "@nestjs/common";
import { BadRequestException } from "src/post/exceptions/badrequest.exception";

/**
 * Class to define an exception filter for blog posts and blog posts replies. 
 * The filter will monitor for any HTTP based exception and build and send a 
 * JSON message back to the client containing the information the client needs 
 * to know. Additionally, logging will be preformed on the exception, so tha 
 * errors can be resolved quickly and completely.  
 */
@Catch( BadRequestException )
export class BlogExceptionFilter implements ExceptionFilter< HttpException >
{
    /* Create a logger instance to log output for debugging and trouble 
     * shooting purposes */
    private readonly logger = new Logger();

    // The filter will look for and catch HttpExceptions
    catch( exception: BadRequestException, host: ArgumentsHost )
    {
        // Get an http context 
        const httpCtx = host.switchToHttp();

        /* Get references to the response and request objects associated with 
         * this exception */
        const request = httpCtx.getRequest();
        const response = httpCtx.getResponse();
        
        // Get a reference to the status code 
        const status = exception.getStatus(); 

        // Format the respone given back to the client regarding this exception 
        response.status(status).json(
        {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
            reasons: exception.reasons
        });

        // Log the exception as an error 
        this.logger.error(exception.message, exception.stack );
        
        // Log error to a file
    }
}