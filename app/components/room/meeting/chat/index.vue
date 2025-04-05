<template>
	<aside class="flex flex-col gap-3">
		<ul
			ref="messageList"
			:class="['flex flex-col gap-6 p-4 overflow-y-auto border border-primary-500 rounded-sm', $style.chatList]"
		>
			<li
				v-for="item in history"
				:key="item.id"
			>
				<h4>
					{{ item.fullname }}
					<span class="text-primary-400 text-xs">{{ parseDateTime(item.datetime, true)[1] }}</span>
				</h4>

				<div class="p-3 bg-primary-700 w-fit rounded-lg mt-2 break-all">
					{{ item.text }}
				</div>
			</li>
		</ul>

		<div class="flex gap-3 mt-auto">
			<Textarea
				v-model="message"
				rows="2"
				class="grow resize-none"
				placeholder="Type message to the chat..."
				maxlength="512"
				@keyup.enter="sendMessage"
			/>

			<Button
				aria-label="Send message"
				icon="pi pi-send"
				size="large"
				class="shrink-0 grow-0"
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
const messageList = useTemplateRef<HTMLUListElement>("messageList");

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
.chatList {
	height: calc(100dvh - ((20px * 2) + 55px + 12px));
}
</style>
