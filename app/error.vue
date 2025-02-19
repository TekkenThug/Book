<template>
	<section :class="$style.errorPage">
		<div class="container">
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
		</div>

		<MainLogo :class="$style.logo" />
	</section>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";
import MainLogo from "~/components/common/main-link";

defineProps<{ error: NuxtError }>();
</script>

<style module>
.errorPage {
	height: 100dvh;
	display: flex;
	justify-content: center;
	align-items: center;
}

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

.logo {
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%) scale(.5);
}
</style>
