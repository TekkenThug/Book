<template>
	<form class="flex flex-col mt-10 min-w-[300px] gap-4">
		<InputText
			v-model="email"
			v-bind="emailAttrs"
			type="text"
			placeholder="Email"
		/>

		<Button
			:disabled="!meta.valid"
			:loading="isLoading"
			@click="reset"
		>
			Reset password
		</Button>

		<Button severity="secondary" @click="emit('change', 'login')">
			Go back
		</Button>
	</form>
</template>

<script lang="ts" setup>
import { resetPassword } from "~/validation/schemas";
import { authService, isAPIError } from "~/services/api";
import type { AuthFormMode } from "~/types";

const { showErrorToast, showSuccessToast } = useUI();
const { meta, defineField, handleSubmit } = useForm({
	validationSchema: toTypedSchema(resetPassword),
});

const emit = defineEmits<{
	change: [value: AuthFormMode];
}>();

const [email, emailAttrs] = defineField("email");
const isLoading = ref(false);

const reset = handleSubmit(async (values) => {
	try {
		isLoading.value = true;
		const { data } = await authService.resetPassword(values.email);
		showSuccessToast(data?.message ?? "Password reset success");
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
