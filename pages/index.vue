<script setup lang="ts">
const user = useUser();
const { toastInfo } = useToaster();

const isLoading = ref(false);

async function signOut() {
  isLoading.value = true;
  try {
    await $fetch('/auth/signout', {
      method: 'POST',
    });

    toastInfo('Signing out...');

    reloadNuxtApp();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <main class="container mx-auto relative">
    <section class="my-4 absolute top-0 w-full flex justify-between items-center">
      <h1 class="text-3xl font-bold">Nuxt Auth Demo</h1>
      <div class="flex gap-2">
        <UButton
          v-if="user"
          @click="signOut"
          :loading="isLoading"
        >
          Sign Out
        </UButton>
      </div>
    </section>
    <section class="flex flex gap-4 justify-center items-center h-screen">
      <UButton
        v-if="!user"
        size="xl"
        to="/sign-in"
      >
        Sign In
      </UButton>
      <UButton
        v-if="!user"
        size="xl"
        to="/sign-up"
      >
        Sign Up
      </UButton>
      <UButton
        v-if="user"
        size="xl"
        to="/protected"
        :loading="isLoading"
      >
        Protected Page
      </UButton>
    </section>
  </main>
</template>

<style scoped></style>
