<template>
	<form class="flex flex-col mt-10 min-w-[300px] gap-4">
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
import { authService, isAPIError } from "~/services/api";

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
		const { data } = await authService.approveResetPassword({ token: props.token, ...values });
		showSuccessToast(data?.message ?? "Success");
		void router.push({ name: "auth" });
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
