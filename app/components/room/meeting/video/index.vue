<template>
	<section :class="$style.videoWindow">
		<div :class="$style.videoList">
			<div
				v-for="item in frames"
				:key="item.id"
				:class="$style.videoWrapper"
			>
				<video autoplay :srcObject.prop="item.stream" />

				<img
					v-show="!item.activity.video"
					:class="$style.videoAvatar"
					:src="findAvatar(item.id)"
				>
			</div>
		</div>

		<div :class="$style.videoControls">
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

			<NuxtLink :to="{ name: 'profile' }">
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
import type { roomService } from "~/services";

const props = defineProps<{
	participants: Awaited<ReturnType<typeof roomService.getParticipants>>;
	frames: Frame[];
	activity: Frame["activity"];
}>();
const emit = defineEmits<{ toggleDevice: [device: RemoteUserOptions["device"]] }>();

const findAvatar = (id: string) => {
	return props.participants.find(participant => participant.id.toString() === id)?.avatar ?? "";
};
</script>

<style module>
.videoWindow {
	display: grid;
	grid-template-rows: 1fr 80px;
}

.videoList {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	flex-wrap: wrap;
}

.videoWrapper {
	max-width: 400px;
	border-radius: 4px;
	aspect-ratio: 16 / 9;
	overflow: hidden;
	position: relative;
}

.videoWrapper video {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center center;
}

.videoAvatar {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100px;
	border-radius: 50%;
}

.videoControls {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
}
</style>
