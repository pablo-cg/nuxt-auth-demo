<script setup lang="ts">
const user = useUser();
</script>

<template>
  <main class="container mx-auto relative">
    <h1 class="text-3xl font-bold my-4 absolute top-0">Nuxt Auth Demo</h1>
    <section class="flex-col flex gap-4 justify-center items-center h-screen">
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
      >
        Protected Page
      </UButton>
    </section>
  </main>
</template>

<style scoped></style>
