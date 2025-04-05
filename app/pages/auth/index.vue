<template>
	<section class="flex flex-col items-center justify-center p-5 min-h-dvh">
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
import type { AuthFormMode } from "~/types";

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
