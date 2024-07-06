<template>
  <section :class="$style.section">
    <div class="container">
      <h2 :class="['h2', $style.title]">
        {{ title }}
      </h2>

      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>();
</script>

<style module>
.section {
  padding: 40px 0;
}

.title {
  margin-bottom: 40px;
}
</style>
