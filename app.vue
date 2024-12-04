<script lang="ts" setup>
useHead({
  titleTemplate(title) {
    return title ? `${title} - Nuxt Auth` : 'Nuxt Auth';
  },
});
</script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <AppFooter />
    <UNotifications />
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
