import API from "~/services/instance";
import type { Message } from "~/types/api";

type Record = {
	user_id: number;
	event_id: number;
};

export default {
	async recordToEvent(eventId: number) {
		return (await API.post("/records", { event_id: eventId })).data;
	},

	async get(params?: { event_id?: number }) {
		return (await API.get<Record[]>("/records", { params })).data;
	},

	async unsubscribe(event_id: number) {
		return (await API.delete<Message>(`/records/${event_id}`)).data;
	},
};
