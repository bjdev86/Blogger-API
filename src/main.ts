import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, ExpressSwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Module Constants 
const PORT = 3000; 

/**
 * 
 * @param app 
 * @param saveDoc 
 */
function bootstrapSwagger(app: INestApplication, saveDoc?: boolean)
{
  //const fs = new FileSystem();

  // Configure the swagger instance 
  const config = new DocumentBuilder()
    .setTitle("BlogAPI")
    .setDescription("Blog API providing CRUD operations for blog posts and blog post replies.")
    .setVersion('1.0.1')
    .addTag('Blogs').addTag('Users').addTag('Example')
    .addServer('https://benjmiller.dev/api/blogger/', 'Production')
    .addServer('http://localhost:3000/', 'Local Dev')
    .setBasePath('/here/')
    .build(); 

    
    /* Build the swagger document using the configuration and the decorators 
    * from other routes */ 
   const document = SwaggerModule.createDocument(app, config);
   
   // Save the document if requested 
   if (saveDoc)
   {
     
   }
  
  // Set a few more options
  const options: ExpressSwaggerCustomOptions = { };

  // Setup the swagger docs
  SwaggerModule.setup('docs', app, document, options);
}

/* Main entry point for the this API, called by run time environment when this 
 * API is started */
async function bootstrap() 
{
  // Create a base Nest app 
  const app = await NestFactory.create(AppModule);

  // Bootstrapp the swagger module  
  bootstrapSwagger(app);

  // Start the app running on the give port
  await app.listen(PORT);
}
bootstrap(); // Start the bootstrap process. Start the app.
