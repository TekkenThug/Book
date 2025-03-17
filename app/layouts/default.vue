<template>
	<CommonHeader />

	<main class="main">
		<slot />
	</main>
</template>

<script setup lang="ts">
import { CommonHeader } from "#components";
</script>
