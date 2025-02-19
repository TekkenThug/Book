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
						v-tooltip.bottom="disabledTooltipText"
						icon="pi pi-angle-right"
						icon-pos="right"
						label="Go to the room"
						disabled
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { type Event, eventsService } from "~/services/events";
import { parseInterval } from "~/utils/date";
import { UiEditorShowcase } from "#components";

const route = useRoute();
const router = useRouter();

const event = ref<Event | null>(null);

const disabledTooltipText = computed(() => "Meeting time didn't come");

onBeforeMount(async () => {
	try {
		event.value = await eventsService.getById(+(route.params.id as string));
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
}
</style>
