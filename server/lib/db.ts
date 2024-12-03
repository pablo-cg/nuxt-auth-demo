import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const config = useRuntimeConfig();

const libsql = createClient({
  url: config.TURSO_DATABASE_URL,
  authToken: config.TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSQL(libsql);
const prismaClient = new PrismaClient({ adapter });

export { prismaClient };
