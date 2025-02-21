<template>
	<div :class="$style.meeting">
		<aside>
			Paricipants
		</aside>

		<section>
			Cameras
		</section>

		<aside :class="$style.chat">
			<ul :class="$style.chatList">
				<li v-for="item in messageHistory" :key="item.id">
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
	</div>
</template>

<script lang="ts" setup>
import { io, type Socket } from "socket.io-client";
import { roomSerivce } from "~/services";
import { isAPIError } from "~/services/instance";

const authStore = useAuthStore();
const { showErrorToast } = useUI();

const props = defineProps<{ roomId: number }>();

const message = ref("");
const messageHistory = ref<{ id: number; fullname: string; text: string; datetime: string }[]>([]);
const socket = ref<Socket | null>(null);

const sendMessage = () => {
	socket.value?.emit("chat-message", message.value);

	message.value = "";
};

const setWSConnection = () => {
	socket.value = io("http://localhost:8030", { query: { room_id: props.roomId, token: authStore.token } });

	socket.value.on("connect", () => {
		console.log("Chat Socket - Connected");
	});

	socket.value.on("chat-receive", (data) => {
		messageHistory.value.push(data);
	});
};

const getRoomInfo = async () => {
	try {
		const roomInfo = await roomSerivce.getInfo(props.roomId);

		messageHistory.value = roomInfo.chat_log;
	}
	catch (error) {
		if (isAPIError(error)) {
			showErrorToast(error.message);
		}
	}
};

onBeforeMount(() => {
	setWSConnection();
	getRoomInfo();
});

onBeforeUnmount(() => {
	socket.value?.disconnect();
});
</script>

<style module>
.meeting {
    width: 100%;
    height: 100dvh;
    display: grid;
    grid-template-columns: 280px 1fr 390px;
}

.chat {
    display: flex;
    flex-direction: column;
    padding: 20px;
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
	height: calc(100% - 55px);
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
