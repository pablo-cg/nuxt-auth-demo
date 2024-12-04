<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <header class="my-4 absolute top-0 w-full flex justify-between items-center px-4 md:px-0">
    <h1 class="text-3xl font-bold">{{ title }}</h1>
    <div class="flex gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
