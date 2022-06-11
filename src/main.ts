import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
    .setDescription("Blog API supporting User Accounts")
    .setVersion('1.0.1')
    .addTag('Blogs').addTag('Users').addTag('Example')
    .build(); 

  /* Build the swagger document using the configuration and the decorators 
   * from other routes */ 
  const document = SwaggerModule.createDocument(app, config);

  // Save the document if requested 
  if (saveDoc)
  {

  }

  // Setup the swagger docs
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() 
{
  // Create a base Nest app 
  const app = await NestFactory.create(AppModule);

  // Bootstrapp the swagger module  
  bootstrapSwagger(app);

  // Start the app running on the give port
  await app.listen(3000);
}
bootstrap(); // Start the bootstrap process. Start the app.
