import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

let prisma = null;

/**
 * This function will create the Prisma Client Instance.
 * @returns prisma client Instance
*/
const createPrismaClientManager = () => {
  return async () => {
    if (!prisma) {
      prisma = new PrismaClient({
        log: [
          { level: 'query', emit: 'event' },
          { level: 'error', emit: 'stdout' },
          { level: 'warn', emit: 'stdout'}
        ],
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });

      prisma.$on('query', (e) => {
        console.log("=============xxxxxx===========");
        console.log('Query: ', e.query);
        console.log('Params: ', e.params);
        console.log('Duration: ', e.duration, 'ms');
        console.log("=============xxxxxx============\n\n")
      });
    }
    return prisma;
  };
};

/**
 * Function used to get the Prisma Client instances from any file.
*/
export const getPrismaClient = createPrismaClientManager();

const cleanupPrismaClient = async () => {
  if(prisma) {
    await prisma.$disconnect();
  }
}

export const dbConnect = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Not able to Connect with Database, Check your Configurations.");
    console.log("Error connecting to DB: ", error);
  }
}

// Handling the Cleanup of the Prisma instance on force user process killed.

process.on('SIGINT', async () => {
  await cleanupPrismaClient();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await cleanupPrismaClient();
  process.exit(0);
});