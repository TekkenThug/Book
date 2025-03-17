<template>
	<form :class="$style.content">
		<div :class="$style.fields">
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

		<p :class="$style.registerInvitation">
			Already registered? <span @click="$emit('change', 'login')">Log in!</span>
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
import { UiPasswordInput } from "#components";
import { register } from "~/validation/schemas";
import { authService } from "~/services/api";
import type { AuthFormMode } from "~/pages/auth/types";

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
	catch (e) {
		showErrorToast((e as Error).message);
	}
	finally {
		isLoading.value = false;
	}
});
</script>

<style module>
.content {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  min-width: 300px
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.registerInvitation {
  text-align: center;
  margin: 20px 0 30px;
}

.registerInvitation span {
  color: #5AA9E6;
  cursor: pointer;
}
</style>
