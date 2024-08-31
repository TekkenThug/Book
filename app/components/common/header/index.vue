<template>
	<header :class="[$style.header, { [$style.fixed]: fixed }]">
		<div class="container">
			<div :class="$style.wrapper">
				<MainLogo />

				<nav>
					<ul :class="$style.navList">
						<li
							v-for="link in navigation"
							:key="link.name"
							:class="$style.navItem"
						>
							<NuxtLink :to="{ name: link.name }">
								{{ link.title }}
							</NuxtLink>
						</li>
					</ul>

					<Avatar
						v-if="authStore.authenticated && userStore.user"
						:image="userStore.user.avatar"
						shape="circle"
						:class="$style.avatar"
						@click="goToProfile"
					/>
				</nav>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import MainLogo from "~/components/common/main-link";
import Avatar from "~/components/ui/avatar";

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

withDefaults(defineProps<{ fixed?: boolean }>(), { fixed: false });

const navigation = computed(() => [
	{
		name: "auth",
		title: "Login",
	},
].filter(item => authStore.authenticated ? item.auth : !item.auth));

const goToProfile = async () => {
	await router.push({ name: "profile" });
};
</script>

<style module>
.header {
  padding: 20px 0;
}

.header.fixed {
  width: 100%;
  position: fixed;
  z-index: 1000;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navList {
  display: flex;
  gap: 40px;
}

.navItem {
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  cursor: pointer;
}

.avatar {
  cursor: pointer;
  border: 2px solid var(--p-inputtext-border-color);
  width: 42px;
  height: 42px;
}
</style>
