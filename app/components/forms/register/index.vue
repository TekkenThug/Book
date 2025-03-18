<template>
	<form class="flex flex-col mt-10 min-w-[300px]">
		<div class="flex flex-col gap-4 mb-10">
			<InputText
				v-model="firstName"
				v-bind="firstNameAttrs"
				type="text"
				placeholder="First name"
			/>

			<InputText
				v-model="lastName"
				v-bind="lastNameAttrs"
				type="text"
				placeholder="Last name"
			/>

			<InputText
				v-model="email"
				v-bind="emailAttrs"
				type="text"
				placeholder="Email"
			/>

			<UiPasswordInput
				v-model="password"
				v-bind="passwordAttrs"
				placeholder="Password"
			/>

			<InputText
				v-model="repeatPassword"
				v-bind="repeatPasswordAttrs"
				type="password"
				placeholder="Repeat password"
			/>
		</div>

		<p class="text-center mb-3">
			Already registered? <span class="text-carrot-500 cursor-pointer" @click="$emit('change', 'login')">Log in!</span>
		</p>

		<Button
			:disabled="!meta.valid"
			:loading="isLoading"
			@click="registerNewUser"
		>
			Register
		</Button>
	</form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { register } from "~/validation/schemas";
import { authService, isAPIError } from "~/services/api";
import type { AuthFormMode } from "~/types";

const emit = defineEmits<{
	change: [value: AuthFormMode];
}>();

const { showSuccessToast, showErrorToast } = useUI();
const { meta, defineField, handleSubmit } = useForm({
	validationSchema: toTypedSchema(register),
});
const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [repeatPassword, repeatPasswordAttrs] = defineField("repeatPassword");

const isLoading = ref(false);
const registerNewUser = handleSubmit(async (values) => {
	if (isLoading.value) {
		return;
	}

	try {
		isLoading.value = true;

		const { data } = await authService.register({
			email: values.email,
			first_name: values.firstName,
			last_name: values.lastName,
			password: values.password,
			repeat_password: values.repeatPassword,
		});

		showSuccessToast(data?.message ?? "Successfully registered");
		emit("change", "login");
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
