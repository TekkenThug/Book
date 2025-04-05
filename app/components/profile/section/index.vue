<template>
	<section class="flex-grow">
		<div class="container">
			<h2 class="h2 mb-10">
				{{ title }}
			</h2>

			<slot />
		</div>
	</section>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>();
</script>
