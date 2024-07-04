<template>
  <section :class="$style.section">
    <h1 class="h1">
      Book
    </h1>

    <div :class="$style.content">
      <div :class="$style.fields">
        <InputText v-model="authCredentials.email" type="text" placeholder="Email" />

        <InputText v-model="authCredentials.password" type="password" placeholder="Password" />
      </div>

      <p :class="$style.registerInvitation">
        Don`t have an account? <NuxtLink :to="{ name: 'register' }">Register now!</NuxtLink>
      </p>

      <Button :disabled="buttonIsDisabled" :loading="isLoading" @click="auth">
        Log in
      </Button>
    </div>
  </section>

  <Toast position="bottom-right" />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const isLoading = ref(false);
const authCredentials = reactive({
  email: "",
  password: ""
});
const buttonIsDisabled = computed(() => !authCredentials.email || !authCredentials.password);

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const auth = async () => {
  if (isLoading.value) {
    return;
  }

  try {
    isLoading.value = true;
    await authStore.authenticateUser(authCredentials);
    await router.push({ name: "profile" });
  } catch (e) {
    toast.add({ severity: "error", summary: "Error", detail: (e as Error).message })
  } finally {
    isLoading.value = false;
  }
}
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
