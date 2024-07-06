<template>
  <Section title="Settings">
    <Loader v-if="isLoading" />

    <form v-else-if="initialSettings && editableSettings">
      <div :class="$style.fields">
        <div :class="$style.fieldContainer">
          <label for="username">Email</label>

          <InputText :model-value="initialSettings.email" type="email" disabled />
        </div>

        <div :class="$style.fieldContainer">
          <label for="username">First name</label>

          <InputText v-model="editableSettings.first_name" type="text" />
        </div>

        <div :class="$style.fieldContainer">
          <label for="username">Last name</label>

          <InputText v-model="editableSettings.last_name" type="text" />
        </div>

        <div :class="$style.fieldContainer">
          <label for="username">New password</label>

          <PasswordInput v-model="editableSettings.password" />
        </div>

        <div :class="$style.fieldContainer">
          <label for="username">Repeat password</label>

          <InputText v-model="editableSettings.repeat_password" type="password" />
        </div>
      </div>

      <Button
        label="Save"
        icon="pi pi-check"
        :disabled="saveButtonIsDisabled"
        :loading="saveIsLoading"
        @click="saveSettings"
      />
    </form>
  </Section>
</template>

<script setup lang="ts">
import PasswordInput from "~/components/ui/password-input";
import Loader from "~/components/common/loader/loader";
import Section from "~/components/profile/section";
import type { Settings } from "~/types/users";
import type { Message } from "~/types/api";
import { PASSWORD_REGEXP } from "~/data/regexp";

const authStore = useAuthStore();

const isLoading = ref(true);

const initialSettings = ref<Settings | null>(null);
const editableSettings = ref<Omit<Settings, "email"> & { password: string; repeat_password: string } | null>(null);
const { showErrorToast, showSuccessToast } = useUI();
onBeforeMount(async () => {
  try {
    initialSettings.value = await authStore.fetchAPI<Settings>("/users/settings");
    editableSettings.value = { first_name: initialSettings.value.first_name, last_name: initialSettings.value.last_name, password: "", repeat_password: "" };
    isLoading.value = false
  } catch (e) {
    showErrorToast((e as Error).message);
  }
});
const saveButtonIsDisabled = computed(() => {
  if (!initialSettings.value || !editableSettings.value) {
    return true;
  }
  return (
    editableSettings.value.first_name === initialSettings.value.first_name &&
      initialSettings.value.last_name === editableSettings.value.last_name
    )
    &&
    (editableSettings.value.password &&
      editableSettings.value.password !== editableSettings.value.repeat_password ||
    !PASSWORD_REGEXP.test(editableSettings.value.password))
});

const saveIsLoading = ref(false);
const saveSettings = async () => {
  if (!editableSettings.value) {
    return;
  }

  try {
    saveIsLoading.value = true;

    const response = await authStore.fetchAPI<Message>("/users/settings", {
      method: "patch",
      body: Object.entries(editableSettings.value).reduce((acc, curr) => {
        if (!curr[1]) {
          return acc;
        }

        return { ...acc, [curr[0]]: curr[1]}
      }, {})
    });
    showSuccessToast(response.message)

    replaceInitialValuesWithActual();
  } catch (e) {
    showErrorToast((e as Error).message)
  } finally {
    saveIsLoading.value = false;
  }
}
const replaceInitialValuesWithActual = () => {
  if (!initialSettings.value || !editableSettings.value) {
    return;
  }
  initialSettings.value.first_name = editableSettings.value.first_name;
  initialSettings.value.last_name = editableSettings.value.last_name;

  editableSettings.value.password = "";
  editableSettings.value.repeat_password = "";
}
</script>

<style module>
.fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  flex-wrap: wrap;
  width: 60%;
  margin-bottom: 20px;
}

.fieldContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
