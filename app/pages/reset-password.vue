<template>
	<section :class="$style.section">
		<CommonMainLink />

		<FormsNewPassword :token="preparedToken" />
	</section>
</template>

<script lang="ts" setup>
import { FormsNewPassword, CommonMainLink } from "#components";

definePageMeta({
	layout: false,
});

const route = useRoute();
const router = useRouter();

const preparedToken = computed(() => {
	if (Array.isArray(route.query.resetToken) || !route.query.resetToken) {
		return "";
	}

	return route.query.resetToken;
});

onBeforeMount(() => {
	if (!route.query.resetToken) {
		router.push({ name: "index" });
	}
});
</script>

<style module>
.section {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100dvh;
	padding: 20px;
}
</style>
