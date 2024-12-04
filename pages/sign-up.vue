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
  name: z.string().min(2, 'Name is required'),
  password: z.string().min(4, 'Password is required'),
});

type Schema = z.output<typeof schema>;

const formState = reactive<Schema>({
  email: '',
  password: '',
  name: '',
});

async function signUp(event: FormSubmitEvent<Schema>) {
  isLoading.value = true;
  try {
    await $fetch('/auth/signup', {
      method: 'POST',
      body: event.data,
    });

    toastSuccess('You can now sign in');

    await navigateTo('/sign-in');
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
    <AppHeader title="Sign Up">
      <template #actions>
        <UButton
          :loading="isLoading"
          to="/"
        >
          Home
        </UButton>
        <UButton
          :loading="isLoading"
          to="/sign-in"
        >
          Sign In
        </UButton>
      </template>
    </AppHeader>
    <section class="flex flex-col gap-5 justify-center items-center h-screen">
      <h2 class="text-xl font-bold">Sign Up</h2>
      <UForm
        :schema="schema"
        :state="formState"
        @submit="signUp"
        class="flex flex-col gap-3 w-1/3"
      >
        <UFormGroup name="name">
          <UInput
            type="text"
            placeholder="Name"
            v-model="formState.name"
            :disabled="isLoading"
          />
        </UFormGroup>

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
            :disabled="isLoading"
            :ui="{ icon: { trailing: { pointer: '' } } }"
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
          :loading="isLoading"
          type="submit"
        >
          Sign Up
        </UButton>
      </UForm>
    </section>
  </main>
</template>

<style scoped></style>
