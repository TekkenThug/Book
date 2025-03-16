import { Peer } from "peerjs";
import { ref } from "vue";

export type Frame = {
	id: string;
	stream: MediaStream;
	activity: {
		video: boolean;
		audio: boolean;
	};
};

export type RemoteUserOptions = {
	device: "audio" | "video";
	id: string;
	state: boolean;
};

export const usePeer = () => {
	const config = useRuntimeConfig();
	let peer: Peer | null = null;
	const videoFrames = ref<Frame[]>([]);
	const streamConfiguration = {
		video: true,
		audio: true,
	};

	const localFrame = computed(() => videoFrames.value?.[0]);

	const hasStream = (peerId: string) => {
		return Boolean(videoFrames.value.find(frame => frame.id === peerId));
	};

	const init = async (userId: string) => {
		const localStream = await navigator.mediaDevices.getUserMedia(streamConfiguration);
		videoFrames.value.push({
			id: userId,
			stream: localStream,
			activity: {
				video: true,
				audio: true,
			},
		});
		toggleAudio();

		peer = new Peer(userId, config.public.peer);

		peer.on("call", (call) => {
			if (localStream) {
				call.answer(localStream);
			}

			call.on("stream", (remoteStream) => {
				if (!hasStream(call.peer)) {
					videoFrames.value.push({
						id: call.peer,
						stream: remoteStream,
						activity: {
							video: remoteStream.getVideoTracks()[0]?.enabled,
							audio: remoteStream.getAudioTracks()[0]?.enabled,
						},
					});
				}
			});
		});
	};

	const connectToNewUser = (userId: string) => {
		if (!localFrame.value?.stream) {
			return;
		}
		const call = peer?.call(userId, localFrame.value.stream);

		if (call) {
			call.on("stream", (remoteStream) => {
				if (!hasStream(userId)) {
					videoFrames.value.push({
						id: userId,
						stream: remoteStream,
						activity: {
							video: remoteStream.getVideoTracks()[0]?.enabled,
							audio: remoteStream.getAudioTracks()[0]?.enabled,
						},
					});
				}
			});
		}
	};

	const deleteFrame = (id: string) => {
		videoFrames.value = videoFrames.value.filter(frame => frame.id !== id);
	};

	const toggleVideo = () => {
		const track = localFrame.value.stream?.getVideoTracks()[0];
		if (!track) {
			return;
		}

		localFrame.value.activity.video = track.enabled = !track?.enabled;
	};

	const toggleAudio = () => {
		const track = localFrame.value.stream.getAudioTracks()[0];
		if (!track) {
			return;
		}

		localFrame.value.activity.audio = track.enabled = !track?.enabled;
	};

	const toggleUserDevice = ({ id, device, state }: RemoteUserOptions) => {
		const frame = videoFrames.value.find(frame => frame.id === id.toString());

		if (!frame) {
			return;
		}

		frame.activity[device] = state;
	};

	onBeforeUnmount(() => {
		peer?.disconnect();
		localFrame.value.stream.getTracks().forEach(track => track.stop());
	});

	return {
		init,
		videoFrames,
		connectToNewUser,
		deleteFrame,
		toggleVideo,
		toggleAudio,
		toggleUserDevice,
		localFrame,
	};
};
