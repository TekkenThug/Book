<template>
	<aside>
		<h3 :class="['h3', $style.participantTitle]">
			Participants
		</h3>

		<ul :class="$style.participants">
			<li
				v-for="participant in participants"
				:key="participant.id"
				:class="$style.participantItem"
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

<style module>
.participantTitle {
    margin-bottom: 24px;
}

.participants {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.participantItem {
    display: flex;
    gap: 16px;
    align-items: center;
}
</style>
