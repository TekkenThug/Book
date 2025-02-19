<template>
	<Avatar
		v-if="image"
		:image
	/>

	<Avatar
		v-else
		icon="pi pi-user"
	/>
</template>

<script lang="ts" setup>
defineProps<{ image?: string | null }>();
</script>
