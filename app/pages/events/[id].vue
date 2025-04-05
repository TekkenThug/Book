<template>
	<section class="page">
		<div class="container">
			<div v-if="event">
				<h1 class="h1 mb-10">
					{{ event.title }}
				</h1>

				<ul class="flex flex-wrap gap-7">
					<li>
						<h3 class="h3 mb-2.5">
							When:
						</h3>

						<p>
							{{ parseDateTime(event.date) }}
						</p>
					</li>

					<li>
						<h3 class="h3 mb-2.5">
							Duration:
						</h3>

						<p>
							{{ parseInterval(event.duration) }}
						</p>
					</li>

					<li>
						<h3 class="h3 mb-2.5">
							Members count:
						</h3>

						<p>
							{{ event.members_count }}
						</p>
					</li>

					<li class="w-full">
						<h3 class="h3 mb-2.5">
							Description:
						</h3>

						<UiEditorShowcase :text="event.description ?? ''" />
					</li>
				</ul>

				<div class="mt-10 flex gap-2.5">
					<Button
						v-tooltip.bottom="tooltipText"
						icon="pi pi-angle-right"
						icon-pos="right"
						label="Go to the room"
						:disabled="!eventInProcess"
						@click="goToRoom"
					/>

					<Button
						v-if="isOwner"
						label="Delete event"
						icon="pi pi-trash"
						icon-pos="right"
						severity="danger"
						:disabled="eventInProcess"
						@click="isDeleteModalVisible = true"
					/>

					<Button
						v-else
						label="Unsubscribe from event"
						icon="pi pi-user-minus"
						icon-pos="right"
						severity="danger"
						:disabled="eventInProcess"
						@click="unsubscribe"
					/>
				</div>
			</div>
		</div>
	</section>

	<Dialog
		v-model:visible="isDeleteModalVisible"
		modal
		header="Deleting event"
		class="w-[400px]"
	>
		You want to delete this event. Are you sure?

		<div class="flex gap-4 mt-5">
			<Button
				label="Cancel"
				class="grow"
				:disabled="deleteIsLoading"
				@click="isDeleteModalVisible = false"
			/>

			<Button
				label="Delete"
				class="grow"
				severity="danger"
				:loading="deleteIsLoading"
				@click="deleteEvent"
			/>
		</div>
	</Dialog>
</template>

<script lang="ts" setup>
import { add, isWithinInterval } from "date-fns";
import { recordService, eventService, isAPIError } from "~/services/api";
import { parseInterval } from "~/utils/date";
import type { MeetingEvent } from "~/services/api/event";

const route = useRoute();
const router = useRouter();
const { showErrorToast, showSuccessToast } = useUI();

const event = ref<MeetingEvent | null>(null);
const idOfUserEvents = ref<number[]>([]);
const isDeleteModalVisible = ref(false);
const deleteIsLoading = ref(false);

const isOwner = computed(() => event.value && idOfUserEvents.value.includes(event.value.id));

const eventInProcess = computed(() => {
	if (!event.value) {
		return false;
	}

	return isWithinInterval(
		new Date(),
		{
			start: event.value.date,
			end: add(event.value.date, {
				hours: event.value.duration.hours, minutes: event.value.duration.minutes,
			}),
		});
});

const tooltipText = computed(() => eventInProcess.value ? null : "Meeting time didn't come");

const goToRoom = () => {
	router.push({ name: "rooms-id", params: { id: event.value?.id } });
};

const unsubscribe = async () => {
	try {
		if (!event.value) {
			return;
		}

		const { data } = await recordService.unsubscribe(event.value?.id);

		showSuccessToast(data?.message ?? "Success");
		void router.push({ name: "profile-events" });
	}
	catch (error) {
		if (isAPIError(error)) {
			showErrorToast(error.message);
		}
	}
};

const deleteEvent = async () => {
	try {
		if (!event.value) {
			return;
		}

		deleteIsLoading.value = true;

		const { data, error } = await eventService.delete(event.value.id);

		if (data) {
			showSuccessToast(data.message);
			isDeleteModalVisible.value = false;
		}

		if (error && isAPIError(error)) {
			showErrorToast(error.message);
		}
	}
	finally {
		deleteIsLoading.value = false;
	}
};

onBeforeMount(async () => {
	const [userEvents, eventInfo] = await Promise.all([
		eventService.getUsersEvent(),
		eventService.getById(+(route.params.id as string)),
	]);

	if (eventInfo.data) {
		event.value = eventInfo.data;
	}

	if (userEvents.data) {
		idOfUserEvents.value = userEvents.data.map(item => item.id);
	}

	if (userEvents.error || eventInfo.error) {
		void router.push({ name: "index" });
	}
});
</script>
