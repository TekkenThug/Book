<template>
	<aside :class="$style.chat">
		<ul ref="messageList" :class="$style.chatList">
			<li
				v-for="item in history"
				:key="item.id"
			>
				<h4>
					{{ item.fullname }}
					<span :class="$style.messageTime">{{ parseDateTime(item.datetime, true)[1] }}</span>
				</h4>

				<div :class="$style.message">
					{{ item.text }}
				</div>
			</li>
		</ul>

		<div :class="$style.chatControls">
			<Textarea
				v-model="message"
				rows="2"
				placeholder="Type message to the chat..."
				maxlength="512"
				@keyup.enter="sendMessage"
			/>

			<Button
				aria-label="Send message"
				icon="pi pi-send"
				size="large"
				:disabled="!message"
				@click="sendMessage"
			/>
		</div>
	</aside>
</template>

<script setup lang="ts">
import type { ChatLog } from "~/services/api/room";

defineProps<{ history: ChatLog }>();
const emit = defineEmits<{ sendMessage: [message: string] }>();

const message = ref("");
const messageList = useTemplateRef("messageList");

const scrollListToBottom = () => {
	if (!messageList.value) {
		return;
	}
	messageList.value.scrollTop = messageList.value?.scrollHeight ?? 0;
};

const sendMessage = () => {
	emit("sendMessage", message.value);
	message.value = "";

	setTimeout(scrollListToBottom, 500);
};
</script>

<style module>
.chat {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.chatList {
	display: flex;
	flex-direction: column;
    overflow-y: auto;
    border: 1px solid var(--p-primary-500);
	border-radius: var(--p-border-radius-lg);
    padding: 18px;
	gap: 24px;
	height: calc(100dvh - ((20px * 2) + 55px + 12px));
}

.chatControls {
    display: flex;
    gap: 12px;
    margin-top: auto;
}

.chatControls>*:nth-child(2) {
    flex-shrink: 0;
	flex-grow: 0;
}

.chatControls>*:nth-child(1) {
	flex-grow: 1;
	resize: none;
}

.message {
	border-radius: 8px;
	background-color: var(--p-primary-700);
	padding: 12px;
	width: fit-content;
	margin-top: 8px;
	word-break: break-all;
}

.messageTime {
	color: var(--p-primary-400);
	font-size: 10px;
}
</style>
