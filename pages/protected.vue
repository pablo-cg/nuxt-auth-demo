<script setup lang="ts">
const user = useUser();
const { toastInfo } = useToaster();

definePageMeta({
  middleware: ['protected'],
});

async function signOut() {
  try {
    await $fetch('/auth/signout', {
      method: 'POST',
    });

    toastInfo('You are now signed out');

    await navigateTo('/');
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <main class="container mx-auto relative">
    <section class="my-4 absolute top-0 w-full flex justify-between items-center">
      <h1 class="text-3xl font-bold">Protected</h1>
      <div class="flex gap-2">
        <UButton to="/">Home</UButton>
      </div>
    </section>
    <section class="flex flex-col gap-3 justify-center items-center h-screen">
      <p class="text-xl">You are logged in</p>
      <p>
        <pre>{{ user }}</pre>
      </p>
      <UButton
        size="lg"
        @click="signOut"
      >
        Sign Out
      </UButton>
    </section>
  </main>
</template>

<style scoped></style>
