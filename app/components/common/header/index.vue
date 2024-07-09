<template>
	<header :class="[$style.header, { [$style.fixed]: fixed }]">
		<div class="container">
			<div :class="$style.wrapper">
				<NuxtLink :to="{ name: 'index' }" class="h1">
					<img
						src="~/assets/images/orange-book.png"
						alt="book"
						:class="$style.logo"
					>

					Book
				</NuxtLink>

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

						<li
							v-if="authStore.authenticated"
							:class="$style.navItem"
							@click="logout"
						>
							Logout
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

withDefaults(defineProps<{ fixed?: boolean }>(), { fixed: false });

const navigation = computed(() => [
	{
		name: "profile",
		title: "Profile",
		auth: true,
	},
	{
		name: "auth",
		title: "Login",
	},
].filter(item => authStore.authenticated ? item.auth : !item.auth));

const logout = async () => {
	try {
		await authStore.logout();
	}
	catch (e) {
		console.log(e);
	}
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

.logo {
  width: 40px;
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
</style>
