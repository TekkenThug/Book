<template>
	<ProfileSection title="Events">
		<Button
			icon="pi pi-calendar-plus"
			label="Create event"
			class="mb-10"
			@click="goToCreate"
		/>

		<ProfileEventsList />
	</ProfileSection>
</template>

<script lang="ts" setup>
const router = useRouter();
const goToCreate = async () => {
	await router.push({ name: "events-create" });
};
</script>
