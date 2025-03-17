<template>
	<UiLoader v-if="isLoading" />

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
		<Column field="date" header="Date">
			<template #body="slotProps">
				{{ parseDateTime(slotProps.data.date) }}
			</template>
		</Column>
		<Column field="duration" header="Duration">
			<template #body="slotProps">
				{{ parseInterval(slotProps.data.duration) }}
			</template>
		</Column>
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
import { UiLoader } from "#components";
import { eventService } from "~/services/api";
import type { UserMeetingEvent } from "~/services/api/event";
import { isAPIError } from "~/services/instance";

const { showErrorToast } = useUI();

const isLoading = ref(true);
const events = ref<UserMeetingEvent[]>([]);

const getEvents = async () => {
	try {
		const { data } = await eventService.getUsersEvent();

		if (data) {
			events.value = data;
		}

		isLoading.value = false;
	}
	catch (error) {
		if (isAPIError(error)) {
			showErrorToast(error.message);
		}
	}
};

const getTagCaptionState = (role: string) => {
	return role === "owner" ? ["warn", "Owner"] : ["info", "Member"];
};

onBeforeMount(async () => {
	await getEvents();
});
</script>
