<template>
	<ProfileSection title="Events">
		<Button
			icon="pi pi-calendar-plus"
			label="Create event"
			:class="$style.createButton"
			@click="goToCreate"
		/>

		<ProfileEventsList />
	</ProfileSection>
</template>

<script lang="ts" setup>
import { ProfileSection, ProfileEventsList } from "#components";

const router = useRouter();
const goToCreate = async () => {
	await router.push({ name: "events-create" });
};
</script>

<style module>
.createButton {
  margin-bottom: 40px;
}
</style>
