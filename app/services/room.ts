import API from "./instance";

type Room = {
	event_id: number;
	chat_log: { id: number; text: string; datetime: string; fullname: string }[];
};

export default {
	async getInfo(id: number) {
		return (await API.get<Room>(`/rooms/${id}`)).data;
	},
};
