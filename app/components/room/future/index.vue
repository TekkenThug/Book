<template>
	<Card>
		<template #title>
			{{ event.title }} will be soon
		</template>

		<template #content>
			<p>
				This meeting will be on {{ parseDateTime(event.date) }}
				and its duration is {{ parseInterval(event.duration) }}
			</p>
		</template>

		<template #footer>
			<NuxtLink
				v-slot="{ navigate }"
				:to="{ name: 'profile-events' }"
				custom
			>
				<Button :class="$style.goToEventButton" @click="navigate">
					Go to events
				</Button>
			</NuxtLink>
		</template>
	</Card>
</template>

<script lang="ts" setup>
import type { Event } from "~/services/events";
import { parseInterval } from "~/utils/date";

defineProps<{ event: Event }>();
</script>

<style module>
.goToEventButton {
	margin-top: 12px;
}
</style>
