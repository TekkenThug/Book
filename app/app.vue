<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>

	<Toast position="bottom-right" />
</template>

<script lang="ts" setup>
import { usersService } from "~/services/users";

useHead({
	htmlAttrs: {
		class: "p-dark",
	},
});

const authStore = useAuthStore();
const userStore = useUserStore();

onBeforeMount(async () => {
	if (authStore.authenticated) {
		userStore.user = await usersService.getMe();
	}
});
</script>
