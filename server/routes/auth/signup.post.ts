import argon2 from '@node-rs/argon2';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import { prismaClient } from '~/server/lib/db';
import { SignUpForm } from '~/types';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<SignUpForm>(event);

    const userId = nanoid();
    const hashedPassword = await argon2.hash(body.password);

    const user = await prismaClient.user.create({
      data: {
        id: userId,
        email: body.email.toLowerCase(),
        name: body.name,
        password: hashedPassword,
      },
      select: { id: true, email: true, name: true },
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw createError({ statusCode: 409, statusMessage: 'User already exists' });
      }
    }

    console.error(error);
    throw createError({ statusCode: 500, statusMessage: 'Internal server error' });
  }
});
