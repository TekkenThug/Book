import API from "~/services/instance";

export default {
	async get(params: { title?: string } = {}) {
		return (await API.get("/books", { params })).data;
	},
};
