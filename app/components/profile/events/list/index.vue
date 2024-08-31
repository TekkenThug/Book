<template>
	<Loader v-if="isLoading" />

	<DataTable v-else :value="events">
		<template #empty>
			No events
		</template>

		<Column header="Title">
			<template #body="slotProps">
				<NuxtLink class="link" :to="{ name: 'events-id', params: { id: slotProps.data.id } }">
					{{ slotProps.data.title }}
				</NuxtLink>
			</template>
		</Column>

		<Column field="book.title" header="Book" />
		<Column field="date" header="Date" />
		<Column field="duration" header="Duration" />
		<Column field="members_count" header="Members" />

		<Column header="Role">
			<template #body="slotProps">
				<Tag
					:severity="getTagCaptionState(slotProps.data.role)[0]"
					:value="getTagCaptionState(slotProps.data.role)[1]"
				/>
			</template>
		</Column>
	</DataTable>
</template>

<script setup lang="ts">
import Loader from "~/components/common/loader";
import type { MappedEvent } from "~/services/events";
import { eventsService } from "~/services/events";

const { showErrorToast } = useUI();

const isLoading = ref(true);
const events = ref<MappedEvent[]>([]);

const getEvents = async () => {
	try {
		events.value = await eventsService.getUsersEvent();

		isLoading.value = false;
	}
	catch (error) {
		showErrorToast(error.message);
	}
};

const getTagCaptionState = (role: string) => {
	return role === "owner" ? ["warn", "Owner"] : ["info", "Member"];
};

onBeforeMount(async () => {
	await getEvents();
});
</script>
