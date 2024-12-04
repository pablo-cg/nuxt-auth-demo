<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({
  middleware: ['only-guests'],
});

const { toastSuccess, toastError } = useToaster();

const isLoading = ref(false);

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(4, 'Password is required'),
});

type Schema = z.output<typeof schema>;

const formState = reactive<Schema>({
  email: '',
  password: '',
});

async function signIn(event: FormSubmitEvent<Schema>) {
  isLoading.value = true;
  try {
    await $fetch('/auth/signin', {
      method: 'POST',
      body: event.data,
    });

    toastSuccess('You are now signed in');
    await navigateTo('/');
  } catch (error: any) {
    toastError(error?.statusMessage);
  } finally {
    isLoading.value = false;
  }
}

const showPassword = ref(false);

const passwordInputType = computed(() => (showPassword.value ? 'text' : 'password'));
</script>

<template>
  <main class="container mx-auto relative">
    <section class="my-4 absolute top-0 w-full flex justify-between items-center">
      <h1 class="text-3xl font-bold">Sign In</h1>
      <div class="flex gap-2">
        <UButton
          :loading="isLoading"
          to="/"
        >
          Home
        </UButton>
        <UButton
          :loading="isLoading"
          to="/sign-up"
        >
          Sign Up
        </UButton>
      </div>
    </section>
    <section class="flex flex-col gap-5 justify-center items-center h-screen">
      <h2 class="text-xl font-bold">Sign In</h2>
      <UForm
        :schema="schema"
        :state="formState"
        @submit="signIn"
        class="flex flex-col gap-3 w-1/3"
      >
        <UFormGroup name="email">
          <UInput
            type="email"
            placeholder="Email"
            v-model="formState.email"
            :disabled="isLoading"
          />
        </UFormGroup>
        <UFormGroup name="password">
          <UInput
            v-model="formState.password"
            :type="passwordInputType"
            placeholder="Password"
            :ui="{ icon: { trailing: { pointer: '' } } }"
            :disabled="isLoading"
          >
            <template #trailing>
              <UButton
                color="gray"
                variant="link"
                icon="i-heroicons-eye"
                :padded="false"
                :disabled="isLoading"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormGroup>
        <UButton
          type="submit"
          :loading="isLoading"
        >
          Sign In
        </UButton>
      </UForm>
    </section>
  </main>
</template>

<style scoped></style>
