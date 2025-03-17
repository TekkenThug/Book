import API from "~/services/instance";

import type { Book } from "~/services/api/book";
import { parseDateTime, parseInterval } from "~/utils/date";

export type Event = {
	id: number;
	members_count: number;
	title: string;
	date: string;
	book: Book;
	duration: {
		hours?: number;
		minutes?: number;
	};
	description: string;
};

export type EventWithChecked = Event & {
	checked?: boolean;
};

export type MappedEvent = Omit<Event, "duration"> & {
	duration: string;
};

export default {
	async create(payload: {
		title: string;
		datetime: string;
		duration: string;
		book_id: string;
		description: string;
	}) {
		await API.post("/events", { ...payload, book_id: payload.book_id });
	},

	async get(options: {
		future?: boolean;
		book?: string;
		withChecked?: boolean;
	}): Promise<EventWithChecked[]> {
		const params: Record<string, string | boolean | number> = {};

		if (options.future !== undefined) {
			params.future = options.future;
		}

		if (options.book !== undefined) {
			params.book = options.book;
		}

		const url = options.withChecked ? "/events/with-checked" : "/events";

		const { data } = await API.get(url, { params });

		return data;
	},

	async getById(id: number): Promise<Event> {
		return (await API.get<Event>(`/events/${id}`)).data;
	},

	async getUsersEvent(): Promise<MappedEvent[]> {
		const { data } = await API.get<Event[]>("/events/my");

		return data.map(item => ({
			...item,
			date: parseDateTime(item.date) as string,
			duration: parseInterval(item.duration),
		}));
	},
};
