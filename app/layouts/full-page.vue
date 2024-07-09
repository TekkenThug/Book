<template>
	<Header fixed />

	<main class="main">
		<slot />
	</main>
</template>

<script setup lang="ts">
import Header from "~/components/common/header";
</script>
