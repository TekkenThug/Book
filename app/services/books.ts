import API from "~/services/instance";

export const booksService = {
	async get(params: { title?: string } = {}) {
		return (await API.get("/books", { params })).data;
	},
};
