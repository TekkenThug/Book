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
			<ul :class="$style.passwordPopover">
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

<style module>
.passwordPopover {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
}
</style>
