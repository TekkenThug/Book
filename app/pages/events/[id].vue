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
						:disabled="buttonIsDisabled"
						@click="goToRoom"
					/>

					<Button
						label="Unsubscribe from event"
						icon="pi pi-user-minus"
						icon-pos="right"
						severity="danger"
						:disabled="unsubscribeButtonIsDisabled"
						@click="unsubscribe"
					/>
				</div>
			</div>
		</div>
	</section>
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

const buttonIsDisabled = computed(() => {
	if (!event.value) {
		return true;
	}

	return !isWithinInterval(
		new Date(),
		{
			start: event.value.date,
			end: add(event.value.date, {
				hours: event.value.duration.hours, minutes: event.value.duration.minutes,
			}),
		});
});

const unsubscribeButtonIsDisabled = computed(() => {
	if (!event.value) {
		return true;
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

const tooltipText = computed(() => buttonIsDisabled.value ? "Meeting time didn't come" : null);

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

onBeforeMount(async () => {
	try {
		const { data } = await eventService.getById(+(route.params.id as string));

		if (data) {
			event.value = data;
		}
	}
	catch {
		await router.push({ name: "index" });
	}
});
</script>
