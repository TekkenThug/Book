<template>
  <section :class="$style.section">
    <h1 class="h1">
      Book
    </h1>

    <form :class="$style.content">
      <div :class="$style.fields">
        <InputText v-model="email" v-bind="emailAttrs" type="text" placeholder="Email" />

        <InputText v-model="password" v-bind="passwordAttrs" type="password" placeholder="Password" />
      </div>

      <p :class="$style.registerInvitation">
        Don`t have an account? <NuxtLink :to="{ name: 'register' }">Register now!</NuxtLink>
      </p>

      <Button :disabled="!meta.valid" :loading="isLoading" @click="auth">
        Log in
      </Button>
    </form>
  </section>

  <Toast position="bottom-right" />
</template>

<script lang="ts" setup>
import { login } from "~/validation/schemas";
import { toTypedSchema } from "@vee-validate/zod";

definePageMeta({
  layout: false,
});

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const { meta, defineField, handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(login)
});
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const isLoading = ref(false);
const auth = handleSubmit(async (values) => {
  if (isLoading.value) {
    return;
  }

  try {
    isLoading.value = true;
    await authStore.authenticateUser(values);
    await router.push({ name: "profile" });
  } catch (e) {
    toast.add({ severity: "error", summary: "Error", detail: (e as Error).message })
  } finally {
    isLoading.value = false;
  }
})
</script>

<style module>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.registerInvitation {
  margin: 20px 0 30px;
}

.registerInvitation a {
  color: #5AA9E6;
}
</style>
