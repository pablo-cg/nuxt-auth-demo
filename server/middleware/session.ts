import { type Session, type User } from '@prisma/client';
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
  SESSION_COOKIE_NAME,
} from '../lib/auth/cookies';
import { verifyRequestOrigin } from '../lib/auth/request';
import { validateSessionToken } from '../lib/auth/session';

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    const origin = getHeader(event, 'origin');
    const host = getHeader(event, 'host');

    const isForbbiden = !origin || !host || !verifyRequestOrigin(origin, [host]);

    if (isForbbiden) {
      return event.node.res.writeHead(403).end();
    }
  }

  const sessionToken = getCookie(event, SESSION_COOKIE_NAME);

  if (!sessionToken) {
    event.context.session = null;
    event.context.user = null;
    return;
  }

  const { session, user } = await validateSessionToken(sessionToken);

  if (!session) {
    deleteSessionTokenCookie(event);
  } else {
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
  }

  event.context.session = session;
  event.context.user = user;
});

declare module 'h3' {
  interface H3EventContext {
    user: Omit<User, 'password'> | null;
    session: Session | null;
  }
}
