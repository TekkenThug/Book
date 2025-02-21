import type { UserMetadata } from "~/services/users";

export const useUserStore = defineStore("user", () => {
	const user = ref<UserMetadata | null>(null);

	return { user };
});
