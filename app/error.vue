<template>
	<NuxtLayout name="alternative-full">
		<div :class="$style.content">
			<h1 class="h1">
				Error with {{ error.statusCode }}
			</h1>

			<p v-if="error.statusMessage" :class="['p1', $style.message]">
				{{ error.statusMessage }}
			</p>

			<NuxtLink :to="{ name: 'index' }" :class="$style.goToHomeButton">
				<Button
					severity="secondary"
					icon="pi pi-home"
					label="Go to the main page"
				/>
			</NuxtLink>
		</div>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();
</script>

<style module>
.content {
	text-align: center;
}

.message {
	margin-top: 12px;
}

.goToHomeButton {
	display: block;
	margin-top: 40px;
}
</style>
