<script setup lang="ts">
const user = useUser();
const { toastInfo } = useToaster();

definePageMeta({
  middleware: ['protected'],
});

const isLoading = ref(false);

async function signOut() {
  isLoading.value = true;
  try {
    await $fetch('/auth/signout', {
      method: 'POST',
    });

    toastInfo('You are now signed out');

    await navigateTo('/');
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <main class="container mx-auto relative">
    <AppHeader title="Protected">
      <template #actions>
        <UButton
          :loading="isLoading"
          to="/"
          >Home</UButton
        >
      </template>
    </AppHeader>
    <section class="flex flex-col gap-5 justify-center items-center h-screen">
      <p class="text-xl">You are logged in</p>

      <UCard>
        <pre>{{ user }}</pre>
      </UCard>

      <UButton
        size="lg"
        @click="signOut"
        :loading="isLoading"
      >
        Sign Out
      </UButton>
    </section>
  </main>
</template>

<style scoped></style>
