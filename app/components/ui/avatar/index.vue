<template>
	<Avatar
		v-if="props.image"
		v-bind="props"
	/>

	<Avatar
		v-else
		v-bind="props"
		:image="undefined"
		icon="pi pi-user"
	/>
</template>

<script lang="ts" setup>
import type { AvatarProps } from "primevue";

const props = defineProps<AvatarProps>();
</script>
