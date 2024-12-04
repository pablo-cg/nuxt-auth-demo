<script setup lang="ts">
definePageMeta({
  middleware: ['only-guests'],
});

const { toastSuccess, toastError } = useToaster();

const form = reactive({
  email: '',
  password: '',
  name: '',
});

async function signUp() {
  try {
    await $fetch('/auth/signup', {
      method: 'POST',
      body: form,
    });

    toastSuccess('You can now sign in');

    await navigateTo('/sign-in');
  } catch (error: any) {
    toastError(error?.statusMessage);
  }
}
</script>

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
      <form
        @submit.prevent="signUp"
        class="flex flex-col gap-3 w-1/3"
      >
        <UInput
          type="text"
          placeholder="Name"
          v-model="form.name"
        />
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
        <UButton type="submit">Sign Up</UButton>
      </form>
    </section>
  </main>
</template>

<style scoped></style>
