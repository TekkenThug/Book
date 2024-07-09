export default defineNuxtRouteMiddleware(async (to) => {
	const authStore = useAuthStore();

	if (authStore.token) {
		authStore.authenticated = true;

		if (authStore.checkExpiring()) {
			await authStore.refreshTokens();
		}
	}

	if (to.name === "index") {
		return;
	}

	if (authStore.token && ["auth", "register"].includes(to.name as string)) {
		return navigateTo("/");
	}

	if (!authStore.token && !["auth", "register"].includes(to.name as string)) {
		abortNavigation();
		return navigateTo("/auth");
	}
});
