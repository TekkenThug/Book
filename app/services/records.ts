import API from "~/services/instance";

export const recordsService = {
	async recordToEvent(eventId: number) {
		return (await API.post("/records", { event_id: eventId })).data;
	},
};
