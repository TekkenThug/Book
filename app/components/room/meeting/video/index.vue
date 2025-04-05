<template>
	<section class="grid grid-rows-[1fr_80px]">
		<div class="flex items-center justify-center flex-wrap gap-3">
			<div
				v-for="item in frames"
				:key="item.id"
				class="max-w-[400px] rounded-md overflow-hidden relative aspect-video"
			>
				<video
					autoplay
					:srcObject.prop="item.stream"
					class="w-full h-full object-cover object-center"
				/>

				<img
					v-show="!item.activity.video"
					class="absolute w-[100px] rounded-full top-[50%] left-[50%] transform-[translate(-50%,_-50%)]"
					:src="findAvatar(item.id)"
				>
			</div>
		</div>

		<div class="flex items-center justify-center gap-3">
			<Button
				icon="pi pi-video"
				:severity="activity.video ? 'secondary' : 'danger'"
				rounded
				size="large"
				@click="emit('toggleDevice', 'video')"
			/>

			<Button
				icon="pi pi-microphone"
				:severity="activity.audio ? 'secondary' : 'danger'"
				rounded
				size="large"
				@click="emit('toggleDevice', 'audio')"
			/>

			<NuxtLink :to="{ name: 'profile-events' }">
				<Button
					icon="pi pi-sign-out"
					rounded
					size="large"
					severity="danger"
				/>
			</NuxtLink>
		</div>
	</section>
</template>

<script lang="ts" setup>
import type { Participant } from "~/services/api/room";
import type { Frame, RemoteUserOptions } from "~/composables/usePeer";

const props = defineProps<{
	participants: Participant[];
	frames: Frame[];
	activity: Frame["activity"];
}>();
const emit = defineEmits<{ toggleDevice: [device: RemoteUserOptions["device"]] }>();

const findAvatar = (id: string) => {
	return props.participants.find(participant => participant.id.toString() === id)?.avatar ?? "";
};
</script>
