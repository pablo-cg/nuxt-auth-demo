import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { type Session } from '@prisma/client';
import { n_days } from '~/server/utils';
import { prismaClient } from '../db';

export function generateSessionToken() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);

  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + n_days(10)),
  };

  await prismaClient.session.create({ data: session });

  return session;
}

export async function deleteSession(sessionId: string) {
  await prismaClient.session.delete({ where: { id: sessionId } });
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const foundSession = await prismaClient.session.findUnique({
    where: { id: sessionId },
    include: {
      user: {
        select: { email: true, id: true, name: true },
      },
    },
  });

  if (foundSession === null) {
    return { session: null, user: null };
  }

  const { user, ...session } = foundSession;

  if (Date.now() >= session.expiresAt.getTime()) {
    await deleteSession(sessionId);

    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - n_days(5)) {
    session.expiresAt = new Date(Date.now() + n_days(10));

    await prismaClient.session.update({
      where: { id: session.id },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  return { session, user };
}
