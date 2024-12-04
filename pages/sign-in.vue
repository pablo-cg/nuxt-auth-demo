<script setup lang="ts">
definePageMeta({
  middleware: ['only-guests'],
});

const { toastSuccess, toastError } = useToaster();

const form = reactive({
  email: '',
  password: '',
});

async function signIn() {
  try {
    await $fetch('/auth/signin', {
      method: 'POST',
      body: form,
    });

    toastSuccess('You are now signed in');

    await navigateTo('/');
  } catch (error: any) {
    toastError(error?.statusMessage);
  }
}
</script>

<template>
  <main class="container mx-auto relative">
    <section class="my-4 absolute top-0 w-full flex justify-between items-center">
      <h1 class="text-3xl font-bold">Sign In</h1>
      <div class="flex gap-2">
        <UButton to="/">Home</UButton>
        <UButton to="/sign-up">Sign Up</UButton>
      </div>
    </section>
    <section class="flex flex-col gap-5 justify-center items-center h-screen">
      <h2 class="text-xl font-bold">Sign In</h2>
      <form
        @submit.prevent="signIn"
        class="flex flex-col gap-3 w-1/3"
      >
        <UInput
          type="email"
          placeholder="Email"
          v-model="form.email"
        />
        <UInput
          type="password"
          placeholder="Password"
          v-model="form.password"
        />
        <UButton type="submit">Sign In</UButton>
      </form>
    </section>
  </main>
</template>

<style scoped></style>
