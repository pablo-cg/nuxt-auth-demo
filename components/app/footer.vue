<template>
  <footer
    class="border-t border-gray-800 py-2 absolute bottom-0 w-full flex justify-between items-center px-4"
  >
    <p class="text-primary opacity-50">
      &copy; {{ new Date().getFullYear() }}
      Nuxt Auth Demo
    </p>
    <UButton
      icon="lucide:github"
      variant="link"
      to="https://github.com/pablo-cg/nuxt-auth-demo"
      target="_blank"
      class="opacity-50 hover:opacity-100"
    >
      Github
    </UButton>
  </footer>
</template>
