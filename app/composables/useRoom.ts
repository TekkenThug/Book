import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type { ChatLog, Participant } from "~/services/api/room";
import { roomService, isAPIError } from "~/services/api";

export default (id: number, roomId: number, token: string | null) => {
	const config = useRuntimeConfig();
	const userId = id.toString();
	const peer = usePeer();
	const { showErrorToast } = useUI();
	const messageHistory = ref<ChatLog>([]);
	const participants = ref<Participant[]>([]);
	const socket = ref<Socket | null>(null);

	const sendMessage = (message: string) => {
		socket.value?.emit("chat-message", message);
	};

	const setWSConnection = () => {
		return new Promise((resolve) => {
			socket.value = io(config.public.socketURL, { query: { room_id: roomId, token } });

			socket.value.on("connect", () => {
				console.log("Chat Socket - Connected");
				peer.init(userId);
				socket.value?.emit("peer-new-user", userId);
				resolve(null);
			});

			socket.value.on("chat-receive", (data) => {
				messageHistory.value.push(data);
			});

			socket.value.on("room-enter", (newParticipant) => {
				participants.value.push(newParticipant);
			});

			socket.value.on("peer-new-user", peer.connectToNewUser);
			socket.value.on("peer-toggle-device", peer.toggleUserDevice);

			socket.value.on("room-leave", (id) => {
				participants.value = participants.value.filter(item => item.id !== id);
				peer.deleteFrame(id.toString());
			});
		});
	};

	const toggleDevice = (device: RemoteUserOptions["device"]) => {
		if (!peer.localFrame.value) {
			return;
		}

		if (device === "video") {
			peer.toggleVideo();
			socket.value?.emit("peer-toggle-device", {
				id: userId,
				device,
				state: peer.localFrame.value.activity.video,
			});
		}
		else {
			peer.toggleAudio();
			socket.value?.emit("peer-toggle-device", {
				id: userId,
				device,
				state: peer.localFrame.value.activity.audio,
			});
		}
	};

	const getRoomInfo = async () => {
		try {
			const [roomInfo, roomParticipants] = await Promise.all([
				roomService.get(roomId),
				roomService.getParticipants(roomId),
			]);

			messageHistory.value = roomInfo.data?.chat_log ?? [];
			participants.value = roomParticipants.data ?? [];
		}
		catch (error) {
			if (isAPIError(error)) {
				showErrorToast(error.message);
			}
		}
	};

	onBeforeMount(async () => {
		await getRoomInfo();
		await setWSConnection();
	});

	onBeforeUnmount(() => {
		socket.value?.disconnect();
	});

	return {
		toggleDevice,
		participants,
		messageHistory,
		sendMessage,
		peer,
	};
};
