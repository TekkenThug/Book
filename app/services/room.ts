import API from "./instance";

type Room = {
	event_id: number;
	chat_log: { id: number; text: string; datetime: string; fullname: string }[];
	participants: number[];
};

type Participant = {
	id: number;
	first_name: string;
	last_name: string;
	avatar: string;
};

export default {
	async getInfo(id: number) {
		return (await API.get<Room>(`/rooms/${id}`)).data;
	},

	async getParticipants(id: number) {
		return (await API.get<Participant[]>(`/rooms/${id}/participants`)).data;
	},
};
