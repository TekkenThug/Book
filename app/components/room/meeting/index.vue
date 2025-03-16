<template>
	<div :class="$style.meeting">
		<RoomMeetingParticipants :participants="room.participants.value" />

		<RoomMeetingVideo
			v-if="room.peer.localFrame.value"
			:participants="room.participants.value"
			:frames="room.peer.videoFrames.value"
			:activity="room.peer.localFrame.value.activity"
			@toggle-device="room.toggleDevice"
		/>

		<RoomMeetingChat
			ref="chat"
			:history="room.messageHistory.value"
			@send-message="room.sendMessage"
		/>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{ roomId: number }>();

const authStore = useAuthStore();
const room = useRoom(authStore.userId, props.roomId, authStore.token);
</script>

<style module>
.meeting {
	padding: 20px;
    width: 100%;
    height: 100dvh;
    display: grid;
    grid-template-columns: 280px 1fr 390px;
}
</style>
