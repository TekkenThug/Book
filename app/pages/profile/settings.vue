<template>
	<ProfileSection title="Settings">
		<UiLoader v-if="isLoading" />

		<template v-else>
			<div v-if="userStore.user" :class="$style.avatarField">
				<UiAvatar
					:class="$style.avatar"
					:image="uploadedAvatar || userStore.user.avatar"
					size="xlarge"
					shape="circle"
				/>

				<Button
					icon="pi pi-pencil"
					rounded
					:class="$style.editAvatarButton"
					@click="handleClickOnUploader"
				/>

				<input
					ref="avatarUploader"
					:class="$style.avatarUploader"
					type="file"
					accept="image/*"
					@change="handleUploadedAvatar"
				>
			</div>

			<form v-if="initialSettings && editableSettings">
				<div :class="$style.fields">
					<div :class="$style.fieldContainer">
						<label for="username">Email</label>

						<InputText
							:model-value="initialSettings.email"
							type="email"
							disabled
						/>
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

						<UiPasswordInput v-model="editableSettings.password" />
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

			<Button
				:class="$style.logoutButton"
				icon="pi pi-sign-out"
				label="Logout"
				severity="secondary"
				@click="logout"
			/>
		</template>
	</ProfileSection>
</template>

<script setup lang="ts">
import { ProfileSection, UiLoader, UiAvatar, UiPasswordInput } from "#components";
import { PASSWORD_REGEXP } from "~/data/regexp";
import { userService } from "~/services/api";
import type { Settings } from "~/services/api/user";

const authStore = useAuthStore();
const userStore = useUserStore();

const isLoading = ref(true);

const initialSettings = ref<Settings | null>(null);
const editableSettings = ref<
  Omit<Settings, "email"> & { password: string; repeat_password: string } | null
>(null);
const { showErrorToast, showSuccessToast } = useUI();

onBeforeMount(async () => {
	try {
		const { data } = await userService.getSettings();

		if (!data) {
			return;
		}

		initialSettings.value = data;

		editableSettings.value = {
			first_name: initialSettings.value.first_name,
			last_name: initialSettings.value.last_name,
			password: "",
			repeat_password: "",
		};
		isLoading.value = false;
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
});

const saveButtonIsDisabled = computed(() => {
	if (!initialSettings.value || !editableSettings.value) {
		return true;
	}
	return (
		editableSettings.value.first_name === initialSettings.value.first_name
		&& initialSettings.value.last_name === editableSettings.value.last_name
	)
	&& ((editableSettings.value.password
		&& editableSettings.value.password !== editableSettings.value.repeat_password)
	|| !PASSWORD_REGEXP.test(editableSettings.value.password));
});

const saveIsLoading = ref(false);
const saveSettings = async () => {
	if (!editableSettings.value) {
		return;
	}

	try {
		saveIsLoading.value = true;

		const { data } = await userService.updateSettings(
			Object.entries(editableSettings.value).reduce((acc, curr) => {
				if (!curr[1]) {
					return acc;
				}

				return { ...acc, [curr[0]]: curr[1] };
			}, {}));

		showSuccessToast(data?.message ?? "Settings updated");

		replaceInitialValuesWithActual();
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
	finally {
		saveIsLoading.value = false;
	}
};
const replaceInitialValuesWithActual = () => {
	if (!initialSettings.value || !editableSettings.value) {
		return;
	}
	initialSettings.value.first_name = editableSettings.value.first_name;
	initialSettings.value.last_name = editableSettings.value.last_name;

	editableSettings.value.password = "";
	editableSettings.value.repeat_password = "";
};

const avatarUploader = ref<HTMLInputElement | null>(null);
const uploadedAvatar = ref();
const handleClickOnUploader = () => {
	if (avatarUploader.value) {
		avatarUploader.value.click();
	}
};
const handleUploadedAvatar = async (event: Event) => {
	try {
		const target = event.target as HTMLInputElement;
		if (!target.files || !target.files[0]) {
			return;
		}

		const formData = new FormData();
		formData.set("avatar", target.files[0]);

		const { data: result } = await userService.uploadAvatar(formData);
		const { data } = await userService.getMe();

		if (data) {
			userStore.user = data;
		}

		showSuccessToast(result?.message ?? "Avatar uploaded");
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
};

const router = useRouter();
const logout = async () => {
	try {
		await authStore.logout();
		await router.push({ name: "index" });
	}
	catch (e) {
		console.log(e);
	}
};
</script>

<style module>
.fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.fieldContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.avatarField {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.editAvatarButton {
  left: -40px;
  bottom: -40px;
}

.avatarUploader {
  display: none;
}

.logoutButton {
  margin-top: 20px;
}
</style>
