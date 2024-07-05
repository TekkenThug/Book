<template>
  <form :class="$style.content">
    <div :class="$style.fields">
      <InputText v-model="firstName" v-bind="firstNameAttrs" type="text" placeholder="First name" />

      <InputText v-model="lastName" v-bind="lastNameAttrs" type="text" placeholder="Last name" />

      <InputText v-model="email" v-bind="emailAttrs" type="text" placeholder="Email" />

      <Password v-model="password" v-bind="passwordAttrs" placeholder="Password" toggle-mask>
        <template #content>
          Password requirements
        </template>
        <template #footer>
          <Divider />
          <ul :class="$style.passwordPopover">
            <li>Minimum 8 characters</li>
            <li>At least one lowercase</li>
            <li>At least one uppercase</li>
            <li>At least one numeric</li>
            <li>At least one symbol</li>
          </ul>
        </template>
      </Password>

      <InputText v-model="repeatPassword" v-bind="repeatPasswordAttrs" type="password" placeholder="Repeat password" />
    </div>

    <p :class="$style.registerInvitation">
      Already registered? <span @click="$emit('change')">Log in!</span>
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

const emit = defineEmits<{
  (e: "change"): void
}>();

const toast = useToast();
const { meta, defineField, handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(register)
});
const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [repeatPassword, repeatPasswordAttrs] = defineField("repeatPassword");

const isLoading = ref(false);
const authStore = useAuthStore();
const registerNewUser = handleSubmit(async (values) => {
  if (isLoading.value) {
    return;
  }

  try {
    isLoading.value = true;

    const response = await authStore.registerUser({
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      password: values.password,
      repeat_password: values.repeatPassword
    });

    toast.add({ severity: "success", summary: "Done", detail: response.message })
    emit("change");
  } catch (e) {
    toast.add({ severity: "error", summary: "Error", detail: (e as Error).message })
  } finally {
    isLoading.value = false;
  }
})
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

.fields input {
  width: 100%;
}

.passwordPopover {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
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
