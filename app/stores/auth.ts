import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { parseJWT } from "~/utils";
import { userService } from "~/services";

interface UserPayloadInterface {
	email: string;
	password: string;
}

export const useAuthStore = defineStore("auth", () => {
	const authenticated = ref(false);

	const token = useLocalStorage<string | null>("token", null);
	const tokenExpires = useLocalStorage<number | null>("token_exp", null);

	const userId = computed(() => {
		if (!token.value) return null;

		const payload = parseJWT(token.value);

		return payload.sub;
	});

	const checkExpiring = () => {
		if (!tokenExpires.value) return false;

		return new Date().getTime() > tokenExpires.value;
	};

	const authenticateUser = async ({ email, password }: UserPayloadInterface) => {
		const data = await userService.auth.login({ email, password });

		token.value = data.token;
		tokenExpires.value = data.expires;

		authenticated.value = true;
	};

	const refreshTokens = async () => {
		const data = await userService.auth.refreshTokens();

		token.value = data.token;
		tokenExpires.value = data.expires;
	};

	const logout = async () => {
		await userService.auth.logout();

		token.value = null;
		tokenExpires.value = null;

		authenticated.value = false;
	};

	return {
		authenticated,
		authenticateUser,
		token,
		checkExpiring,
		refreshTokens,
		logout,
		userId,
	};
});
