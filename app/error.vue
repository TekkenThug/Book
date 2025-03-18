<template>
	<NuxtLayout name="alternative-full">
		<div class="text-center">
			<h1 class="h1">
				Error with {{ error.statusCode }}
			</h1>

			<p v-if="error.statusMessage" class="p1 mt-3">
				{{ error.statusMessage }}
			</p>

			<NuxtLink :to="{ name: 'index' }" class="block mt-10">
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
