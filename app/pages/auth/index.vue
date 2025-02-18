<template>
	<section :class="$style.section">
		<MainLogo />

		<RegisterForm
			v-if="mode === 'register'"
			@change="changeMode"
		/>

		<LoginForm v-else-if="mode ==='login'" @change="changeMode" />

		<ResetPasswordForm v-else-if="mode === 'reset'" @change="changeMode" />
	</section>
</template>

<script lang="ts" setup>
import MainLogo from "~/components/common/main-link";
import RegisterForm from "~/components/forms/register";
import LoginForm from "~/components/forms/login";
import ResetPasswordForm from "~/components/forms/reset-password";

definePageMeta({
	layout: false,
});

const router = useRouter();
const route = useRoute();

const mode = ref<"login" | "register" | "reset">(route.query.mode as "login" | "register" | null ?? "login");

const changeMode = (newMode: typeof mode) => {
	mode.value = newMode;

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
