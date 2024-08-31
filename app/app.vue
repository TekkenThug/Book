<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>

	<Toast position="bottom-right" />
</template>

<script lang="ts" setup>
useHead({
	htmlAttrs: {
		class: "p-dark",
	},
});

const authStore = useAuthStore();
const userStore = useUserStore();
onBeforeMount(async () => {
	if (authStore.authenticated) {
		userStore.user = await authStore.fetchAPI("/users/me");
	}
});
</script>
