<template>
	<div :class="$style.editorShowcase" v-html="text" />
</template>

<script lang="ts" setup>
defineProps<{ text: string }>();
</script>

<style module>
.editorShowcase h1 {
  font-size: 24px;
  line-height: 24px;
  font-weight: 600;
}

.editorShowcase h2 {
  font-size: 21px;
  line-height: 21px;
  font-weight: 600;
}

.editorShowcase h3 {
  font-size: 18px;
  line-height: 18px;
  font-weight: 600;
}

.editorShowcase p {
  margin: 15px 0;
}

.editorShowcase strong {
  font-weight: 600;
}

.editorShowcase em {
  font-style: italic;
}

.editorShowcase u {
  text-decoration: underline;
}

.editorShowcase a {
  color: var(--link-color);
}
</style>
