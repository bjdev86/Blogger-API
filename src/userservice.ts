import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { MongoMemoryServer } from 'mongodb-memory-server';

// Local Script constants 
const mongod: MongoMemoryServer = new MongoMemoryServer(); 

/**
 * Class to define the shutdown sequence for this NestJS applicatoin. A 
 * function to start the MongoDB in memory server is included for convience.  
 */
@Injectable()
export class UsersService implements OnApplicationShutdown
{
    startMongoDBMemoryServer ()
    {
      // Set the pertinent options for the mongodb instance
      mongod.opts = 
      {
        instance:
        {
          port: 27018/*<number><unknown>process.env.MONGODB_PORT*/,
          ip: process.env.MONGODB_URL,
          dbName: process.env.MONGODB_DBNAME,
        },
        binary: 
        {
          version: '6.0.0',
        },
      };

      // Start the server in memeory 
      mongod.start();
    }

    onApplicationShutdown(signal?: string) 
    {
        // Shutdown the mongodb instance in memeory 
        mongod.stop();
    }
}
