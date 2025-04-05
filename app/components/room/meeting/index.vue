<template>
	<div v-if="room.peer.localFrame.value" class="p-5 w-full h-dvh grid grid-cols-[280px_1fr_390px]">
		<RoomMeetingParticipants :participants="room.participants.value" />

		<RoomMeetingVideo
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
