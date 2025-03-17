<template>
	<UiLoader v-if="isLoading" />

	<template v-else-if="event">
		<RoomFuture v-if="mode === 'future'" :event />

		<template v-else-if="mode ==='prepare' && roomId">
			<RoomMeeting :room-id="roomId" />
		</template>
	</template>
</template>

<script lang="ts" setup>
import { isWithinInterval, isFuture, add } from "date-fns";
import { recordService, eventService } from "~/services/api";
import { isAPIError } from "~/services/instance";
import type { MeetingEvent } from "~/services/api/event";

definePageMeta({
	layout: "alternative-full",
});

const route = useRoute();
const router = useRouter();

const roomId = ref<number>(+(route.params.id as string));
const event = ref<MeetingEvent | null>(null);
const isLoading = ref(true);
const mode = ref<"prepare" | "future">("future");

onBeforeMount(async () => {
	try {
		const { data: records } = await recordService.get({ event_id: +roomId.value });

		if (!records?.length) {
			throw createError({
				statusCode: 404,
				statusMessage: "Not found",
				fatal: true,
			});
		}

		const { data } = await eventService.getById(+roomId.value);

		if (!data) {
			return;
		}

		event.value = data;

		if (isFuture(event.value.date)) {
			return;
		}

		if (
			isWithinInterval(
				new Date(),
				{
					start: event.value.date,
					end: add(event.value.date, {
						hours: event.value.duration.hours, minutes: event.value.duration.minutes,
					}),
				})
		) {
			setPageLayout(false);
			mode.value = "prepare";
		}
		else {
			router.push({ name: "index" });
		}
	}
	catch (error) {
		if (isAPIError(error)) {
			throw createError({
				statusCode: error.status,
				fatal: true,
			});
		}
		else {
			throw error;
		}
	}
	finally {
		isLoading.value = false;
	}
});
</script>
