import type { User } from '@prisma/client';

export const useUser = () => {
  const user = useState<Omit<User, 'password'> | null>('user', () => null);
  return user;
};
