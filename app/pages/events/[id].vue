<template>
	<section class="page">
		<div class="container">
			<div v-if="event">
				<h1 :class="[$style.title, 'h1']">
					{{ event.title }}
				</h1>

				<ul :class="$style.list">
					<li>
						<h3 class="h3">
							When:
						</h3>

						<p>
							{{ parseDateTime(event.date) }}
						</p>
					</li>

					<li>
						<h3 class="h3">
							Duration:
						</h3>

						<p>
							{{ parseInterval(event.duration) }}
						</p>
					</li>

					<li>
						<h3 class="h3">
							Members count:
						</h3>

						<p>
							{{ event.members_count }}
						</p>
					</li>

					<li>
						<h3 class="h3">
							Description:
						</h3>

						<UiEditorShowcase :text="event.description ?? ''" />
					</li>
				</ul>

				<div :class="$style.actions">
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
import type { Event } from "~/services/event";
import { eventService } from "~/services";
import { recordService } from "~/services/api";
import { parseInterval } from "~/utils/date";
import { isAPIError } from "~/services/instance";

const route = useRoute();
const router = useRouter();
const { showErrorToast, showSuccessToast } = useUI();

const event = ref<Event | null>(null);

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
		router.push({ name: "profile-events" });
	}
	catch (error) {
		if (isAPIError(error)) {
			showErrorToast(error.response?.data.message);
		}
	}
};

onBeforeMount(async () => {
	try {
		event.value = await eventService.getById(+(route.params.id as string));
	}
	catch {
		await router.push({ name: "index" });
	}
});
</script>

<style module>
.title {
  margin-bottom: 40px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.list li h3 {
  margin-bottom: 10px;
}

.list li:last-child {
  width: 100%;
}

.actions {
  margin-top: 40px;
  display: flex;
  gap: 12px;
}
</style>
