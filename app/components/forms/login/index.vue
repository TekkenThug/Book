<template>
	<form :class="$style.content">
		<div :class="$style.fields">
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
		</div>

		<p :class="$style.registerInvitation">
			Don't have an account? <span @click="changeMode">Create it!</span>
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
import { login } from "~/validation/schemas";

const emit = defineEmits<{
	(e: "change"): void;
}>();
const changeMode = () => {
	if (isLoading.value) {
		return;
	}

	emit("change");
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
