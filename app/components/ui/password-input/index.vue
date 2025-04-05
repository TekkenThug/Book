<template>
	<Password
		v-model="model"
		:placeholder
		toggle-mask
	>
		<template #content>
			Password requirements
		</template>
		<template #footer>
			<Divider />
			<ul class="flex flex-col gap-1 text-sm">
				<li>Minimum 8 characters</li>
				<li>At least one lowercase</li>
				<li>At least one uppercase</li>
				<li>At least one numeric</li>
				<li>At least one symbol</li>
			</ul>
		</template>
	</Password>
</template>

<script lang="ts" setup>
const model = defineModel<string>();
defineProps<{ placeholder?: string }>();
</script>
