<template>
  <section :class="$style.section">
    <div :class="$style.content">
      <div :class="$style.fields">
        <InputText v-model="authCredentials.email" type="text" placeholder="Email" />

        <InputText v-model="authCredentials.password" type="password" placeholder="Password" />
      </div>

      <Button :disabled="buttonIsDisabled" :loading="isLoading" @click="auth">
        Log in
      </Button>
    </div>
  </section>
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
const auth = async () => {
  if (isLoading.value) {
    return;
  }

  try {
    isLoading.value = true;
    await authStore.authenticateUser(authCredentials);
    await router.push("/");
  } catch (e) {
    console.log(e);
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
}

.content {
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  background-color: black;
  border-radius: 20px;
  border: 1px solid gray;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
}
</style>
