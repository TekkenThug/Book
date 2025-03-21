const PUBLIC_ROUTES = ["auth", "register", "reset-password"];

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

	if (authStore.token && PUBLIC_ROUTES.includes(to.name as string)) {
		return navigateTo("/");
	}

	if (!authStore.token && !PUBLIC_ROUTES.includes(to.name as string)) {
		abortNavigation();
		return navigateTo("/auth");
	}
});
