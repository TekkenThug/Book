<template>
	<section :class="$style.section">
		<CommonMainLink />

		<FormsRegister
			v-if="mode === 'register'"
			@change="changeMode"
		/>

		<FormsLogin v-else-if="mode ==='login'" @change="changeMode" />

		<FormsResetPassword v-else-if="mode === 'reset'" @change="changeMode" />
	</section>
</template>

<script lang="ts" setup>
import type { AuthFormMode } from "./types";
import { CommonMainLink, FormsRegister, FormsLogin, FormsResetPassword } from "#components";

definePageMeta({
	layout: false,
});

const router = useRouter();
const route = useRoute();

const mode = ref<AuthFormMode>(route.query.mode as "login" | "register" | null ?? "login");

const changeMode = (newMode: typeof mode.value) => {
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
