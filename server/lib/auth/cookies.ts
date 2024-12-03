import { type H3Event } from 'h3';

export const SESSION_COOKIE_NAME = 'session';

export function setSessionTokenCookie(event: H3Event, token: string, expiresAt: Date) {
  if (process.dev) {
    appendResponseHeader(
      event,
      'Set-Cookie',
      `${SESSION_COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; path=/;`,
    );
  }

  appendResponseHeader(
    event,
    'Set-Cookie',
    `${SESSION_COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; path=/; Secure;`,
  );
}

export function deleteSessionTokenCookie(event: H3Event) {
  if (process.dev) {
    appendResponseHeader(
      event,
      'Set-Cookie',
      `${SESSION_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Max-Age=0; path=/;`,
    );
  }

  appendResponseHeader(
    event,
    'Set-Cookie',
    `${SESSION_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Max-Age=0; path=/; Secure;`,
  );
}
