<script setup lang="ts"></script>

<template>
  <main class="container mx-auto relative">
    <section class="my-4 absolute top-0 w-full flex justify-between items-center">
      <h1 class="text-3xl font-bold">Sign Up</h1>
      <div class="flex gap-2">
        <UButton to="/">Home</UButton>
        <UButton to="/sign-in">Sign In</UButton>
      </div>
    </section>
    <section class="flex flex-col gap-5 justify-center items-center h-screen">
      <h2 class="text-xl font-bold">Sign Up</h2>
      <form class="flex flex-col gap-3 w-1/3">
        <UInput type="email" placeholder="Email" />
        <UInput type="password" placeholder="Password" />
        <UInput type="text" placeholder="Name" />
        <UButton type="submit">Sign Up</UButton>
      </form>
    </section>
  </main>
</template>

<style scoped></style>
