import API from "~/services/instance";

type Record = {
	user_id: number;
	event_id: number;
};

export const recordsService = {
	async recordToEvent(eventId: number) {
		return (await API.post("/records", { event_id: eventId })).data;
	},

	async get(params?: { event_id?: number }) {
		return (await API.get<Record[]>("/records", { params })).data;
	},
};
