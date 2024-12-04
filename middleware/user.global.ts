export default defineNuxtRouteMiddleware(async () => {
  const requestFetch = useRequestFetch();
  const user = useUser();

  const data = await requestFetch('/auth/user');

  user.value = data ?? null;
});
