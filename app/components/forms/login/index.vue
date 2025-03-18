<template>
	<form class="flex flex-col mt-10 min-w-[300px]">
		<div class="flex flex-col gap-4 mb-10">
			<InputText
				v-model="email"
				v-bind="emailAttrs"
				type="text"
				placeholder="Email"
			/>

			<InputText
				v-model="password"
				v-bind="passwordAttrs"
				type="password"
				placeholder="Password"
			/>

			<Message
				size="small"
				variant="simple"
				severity="secondary"
			>
				Forget password?
				<span class="text-carrot-500 cursor-pointer" @click="changeMode('reset')">Just reset it!</span>
			</Message>
		</div>

		<p class="text-center mb-3">
			Don't have an account?
			<span class="text-carrot-500 cursor-pointer" @click="changeMode('register')">Create it!</span>
		</p>

		<Button
			:disabled="!meta.valid"
			:loading="isLoading"
			@click="auth"
		>
			Log in
		</Button>
	</form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import type { AuthFormMode } from "~/types";
import { login } from "~/validation/schemas";
import { isAPIError } from "~/services/api";

const emit = defineEmits<{
	change: [value: AuthFormMode];
}>();
const changeMode = (mode: AuthFormMode) => {
	if (isLoading.value) {
		return;
	}

	emit("change", mode);
};

const { showErrorToast } = useUI();
const { meta, defineField, handleSubmit } = useForm({
	validationSchema: toTypedSchema(login),
});
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const isLoading = ref(false);
const authStore = useAuthStore();
const auth = handleSubmit(async (values) => {
	if (isLoading.value) {
		return;
	}

	try {
		isLoading.value = true;

		await authStore.authenticateUser(values);
		location.reload();
	}
	catch (error) {
		if (isAPIError(error)) {
			showErrorToast(error.message);
		}
	}
	finally {
		isLoading.value = false;
	}
});
</script>
