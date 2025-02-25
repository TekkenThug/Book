import type { UserMetadata } from "~/services/user";

export const useUserStore = defineStore("user", () => {
	const user = ref<UserMetadata | null>(null);

	return { user };
});
