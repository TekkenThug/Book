<template>
	<header :class="['py-5', { ['w-full fixed z-[var(--z-header)]']: fixed }]">
		<div class="container">
			<div class="flex justify-between items-center">
				<CommonMainLink />

				<nav>
					<ul class="flex gap-10">
						<li
							v-for="link in navigation"
							:key="link.name"
							class="text-lg font-medium cursor-pointer"
						>
							<NuxtLink :to="{ name: link.name }">
								{{ link.title }}
							</NuxtLink>
						</li>
					</ul>

					<UiAvatar
						v-if="authStore.authenticated && userStore.user"
						:image="userStore.user.avatar ?? undefined"
						shape="circle"
						size="large"
						class="cursor-pointer"
						@click="goToProfile"
					/>
				</nav>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

withDefaults(defineProps<{ fixed?: boolean }>(), { fixed: false });

const navigation = computed(() => [
	{
		name: "auth",
		title: "Login",
		auth: false,
	},
].filter(item => authStore.authenticated ? item.auth : !item.auth));

const goToProfile = () => {
	router.push({ name: "profile" });
};
</script>
