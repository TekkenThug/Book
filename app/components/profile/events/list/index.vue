<template>
	<Loader v-if="isLoading" />

	<DataTable v-else :value="events">
    <template #empty>
      No events
    </template>

		<Column field="title" header="Title" />
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
import type { Event, MappedEvent } from "~/types/events";
import { parseDateTime, parseInterval } from "~/utils/date";

const events = ref<MappedEvent[]>([]);

const authStore = useAuthStore();
const { showErrorToast } = useUI();
const isLoading = ref(true);
const getEvents = async () => {
	try {
		events.value = (await authStore.fetchAPI<Event[]>("/events/my")).map(item => ({
			...item,
			date: parseDateTime(item.date) as string,
			duration: parseInterval(item.duration),
		}));
		isLoading.value = false;
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
};

const getTagCaptionState = (role: string) => {
	return role === "owner" ? ["warn", "Owner"] : ["info", "Member"];
};

onBeforeMount(async () => {
	await getEvents();
});
</script>
