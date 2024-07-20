interface UserMetadata {
	avatar: string | null;
}

export const useUserStore = defineStore("user", () => {
	const user = ref<UserMetadata | null>(null);

	return { user };
});
