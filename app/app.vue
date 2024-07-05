<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <Toast position="bottom-right" />
</template>

<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: "p-dark"
  }
})
</script>
