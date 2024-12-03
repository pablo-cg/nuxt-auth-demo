<script setup lang="ts">
const user = useUser();

definePageMeta({
  // middleware: ['protected'],
});
</script>

<template>
  <main class="container mx-auto relative">
    <h1 class="text-3xl font-bold my-4 absolute top-0">Protected Page</h1>
    <section class="flex flex-col gap-3 justify-center items-center h-screen">
      <p class="text-xl">You are logged in</p>
      <UButton
        size="lg"
        to="/sign-in"
      >
        Sign Out
      </UButton>
    </section>
  </main>
</template>

<style scoped></style>
