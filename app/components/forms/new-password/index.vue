<template>
	<form :class="$style.content">
		<PasswordInput
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

		<Button
			:disabled="!meta.valid"
			:loading="isLoading"
			@click="reset"
		>
			Reset password
		</Button>
	</form>
</template>

<script lang="ts" setup>
import { newPassword } from "~/validation/schemas";
import { usersService } from "~/services/users";
import PasswordInput from "~/components/ui/password-input";

const router = useRouter();
const { showErrorToast, showSuccessToast } = useUI();
const { meta, defineField, handleSubmit } = useForm({
	validationSchema: toTypedSchema(newPassword),
});

const props = defineProps<{ token: string }>();

const [password, passwordAttrs] = defineField("password");
const [repeatPassword, repeatPasswordAttrs] = defineField("repeat_password");
const isLoading = ref(false);

const reset = handleSubmit(async (values) => {
	try {
		isLoading.value = true;
		const data = await usersService.auth.approveResetPassword({ token: props.token, ...values });
		showSuccessToast(data.message);
		router.push({ name: "auth" });
	}
	catch (error) {
		showErrorToast((error as Error).message);
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
  min-width: 300px;
  gap: 15px;
}
</style>
