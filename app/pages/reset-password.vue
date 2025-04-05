<template>
	<section class="flex flex-col items-center justify-center p-5 min-h-dvh">
		<CommonMainLink />

		<FormsNewPassword :token="preparedToken" />
	</section>
</template>

<script lang="ts" setup>
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
