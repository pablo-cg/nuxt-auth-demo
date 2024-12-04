import argon2 from '@node-rs/argon2';
import { setSessionTokenCookie } from '~/server/lib/auth/cookies';
import { createSession, generateSessionToken } from '~/server/lib/auth/session';
import { prismaClient } from '~/server/lib/db';
import { UserCredentials } from '~/types';

export default defineEventHandler(async (event) => {
  const body = await readBody<UserCredentials>(event);

  const existingUser = await prismaClient.user.findUnique({
    where: { email: body.email.toLowerCase() },
  });

  if (!existingUser) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }

  const isPasswordValid = await argon2.verify(existingUser.password, body.password);

  if (!isPasswordValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, existingUser.id);
  setSessionTokenCookie(event, sessionToken, session.expiresAt);

  setResponseStatus(event, 200);
});
