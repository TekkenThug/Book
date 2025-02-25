<template>
	<form :class="$style.content">
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

		<Button @click="emit('change', 'login')">
			Go back
		</Button>
	</form>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
import { resetPassword } from "~/validation/schemas";
import { userService } from "~/services";
import type { AuthFormMode } from "~/pages/auth/types";

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
		const data = await userService.auth.resetPassword(values.email);
		showSuccessToast(data.message);
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
