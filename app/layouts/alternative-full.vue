<template>
	<main :class="$style.main">
		<slot />
	</main>

	<CommonMainLink :class="$style.logo" />
</template>

<script lang="ts" setup>
import { CommonMainLink } from "#components";
</script>

<style module>
.main {
	padding: 20px;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%) scale(.5);
}
</style>
