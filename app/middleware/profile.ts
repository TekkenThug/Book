export default defineNuxtRouteMiddleware(async (to) => {
	if (to.name === "profile") {
		return navigateTo({ name: "profile-settings" });
	}

	return;
});
