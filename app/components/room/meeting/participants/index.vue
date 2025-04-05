<template>
	<aside>
		<h3 class="h3 mb-5">
			Participants
		</h3>

		<ul class="flex flex-col gap-3">
			<li
				v-for="participant in participants"
				:key="participant.id"
				class="flex gap-4 items-center"
			>
				<UiAvatar shape="circle" :image="participant.avatar" />

				{{ participant.last_name }} {{ participant.first_name }}
			</li>
		</ul>
	</aside>
</template>

<script lang="ts" setup>
import type { Participant } from "~/services/api/room";

defineProps<{
	participants: Participant[];
}>();
</script>
