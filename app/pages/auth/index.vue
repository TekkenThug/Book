<template>
	<section :class="$style.section">
		<h1 class="h1">
			Book
		</h1>

		<RegisterForm
			v-if="mode === 'register'"
			@change="changeMode"
		/>

		<LoginForm v-else @change="changeMode" />
	</section>
</template>

<script lang="ts" setup>
import RegisterForm from "~/components/forms/register";
import LoginForm from "~/components/forms/login";

definePageMeta({
	layout: false,
});

const router = useRouter();
const route = useRoute();
const mode = ref<"login" | "register">(route.query.mode as "login" | "register" | null ?? "login");

const changeMode = () => {
	mode.value = mode.value === "register" ? "login" : "register";

	router.push({ query: { mode: mode.value } });
};
</script>

<style module>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 20px;
}
</style>
