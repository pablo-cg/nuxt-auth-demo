import { deleteSessionTokenCookie } from '~/server/lib/auth/cookies';
import { deleteSession } from '~/server/lib/auth/session';

export default defineEventHandler(async (event) => {
  if (!event.context.session) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }

  await deleteSession(event.context.session.id);
  deleteSessionTokenCookie(event);
});
