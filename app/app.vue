<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>

	<Toast position="bottom-right" />
</template>

<script lang="ts" setup>
import { userService } from "~/services/api";

useHead({
	htmlAttrs: {
		class: "p-dark",
	},
});

const authStore = useAuthStore();
const userStore = useUserStore();

onBeforeMount(async () => {
	if (authStore.authenticated) {
		const { data } = await userService.getMe();

		if (data) {
			userStore.user = data;
		}
	}
});
</script>
