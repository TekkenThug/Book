<template>
	<Section title="Events">
		<Button
			icon="pi pi-calendar-plus"
			label="Create event"
			:class="$style.createButton"
			@click="goToCreate"
		/>

		<EventList />
	</Section>
</template>

<script lang="ts" setup>
import Section from "~/components/profile/section";
import EventList from "~/components/profile/events/list";

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
