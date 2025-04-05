<template>
	<div>
		<h3 class="h3 mb-2.5">
			Rules of creation
		</h3>

		<ul class="flex flex-col gap-1.5 mb-5">
			<li>
				- You can create ONLY 1 event at ONE date
			</li>

			<li>
				- Title must be more than 5 characters
			</li>

			<li>
				- Date must be more than current date
			</li>
		</ul>

		<form>
			<div class="grid gap-5 mb-5 grid-cols-4">
				<AutoComplete
					v-model="searchingBook"
					option-label="title"
					placeholder="Enter book title"
					:suggestions="suggestedBooks"
					panel-class="w-[420px]"
					@complete="searchBooks"
					@option-select="selectBook"
				>
					<template #option="slotProps">
						<div>
							{{ slotProps.option.title }}, {{ slotProps.option.author.join(", ") }}
						</div>
					</template>
				</AutoComplete>

				<InputText
					v-model="title"
					v-bind="titleAttrs"
					placeholder="Title"
				/>

				<DatePicker
					v-model="datetime"
					v-bind="datetimeAttrs"
					placeholder="Date and time"
					date-format="dd.mm.yy"
					show-time
					hour-format="24"
					:step-minute="10"
					fluid
					:min-date="tomorrowDate"
				/>

				<DatePicker
					v-model="duration"
					time-only
					fluid
					placeholder="Duration"
					:step-minute="10"
				/>
			</div>

			<UiEditor
				v-model="description"
				placeholder="Describe event"
				class="mb-5"
			/>

			<Button
				label="Create"
				icon="pi pi-check"
				:disabled="!meta.valid"
				:loading="isLoading"
				@click="sendToCreateEvent"
			/>
		</form>
	</div>
</template>

<script lang="ts" setup>
import { add } from "date-fns";
import { toTypedSchema } from "@vee-validate/zod";
import type { AutoCompleteCompleteEvent, AutoCompleteOptionSelectEvent } from "primevue/autocomplete";
import { bookService, eventService, isAPIError } from "~/services/api";
import { createEvent } from "~/validation/schemas";
import { mapToInterval } from "~/utils/date";
import type { Book } from "~/services/api/book";

const { showErrorToast, showSuccessToast } = useUI();
const suggestedBooks = ref<Book[]>([]);
const searchingBook = ref("");
const isLoading = ref(false);
const tomorrowDate = add(new Date(), { days: 1 });
const emit = defineEmits<{
	submit: [];
}>();
const searchBooks = async ({ query: title }: AutoCompleteCompleteEvent) => {
	try {
		const { data } = await bookService.get({ title });
		if (!data) {
			return;
		}
		suggestedBooks.value = data;
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
};
const selectBook = ({ value }: AutoCompleteOptionSelectEvent) => {
	book_id.value = value.id;
};

const { meta, defineField, handleSubmit, resetForm } = useForm({
	validationSchema: toTypedSchema(createEvent),
});
const [book_id] = defineField("book_id");
const [title, titleAttrs] = defineField("title");
const [datetime, datetimeAttrs] = defineField("datetime");
const [duration] = defineField("duration");
const [description] = defineField("description");

const sendToCreateEvent = handleSubmit(async (values) => {
	if (isLoading.value) {
		return;
	}

	try {
		isLoading.value = true;

		await eventService.create({
			...values,
			datetime: values.datetime.toISOString(),
			duration: mapToInterval(values.duration),
			book_id: values.book_id,
			description: values.description ?? "",
		});

		searchingBook.value = "";
		resetForm();

		showSuccessToast("Event successfully created");

		emit("submit");
	}
	catch (error) {
		if (isAPIError(error)) {
			showErrorToast(error.message);
		}
	}
	finally {
		isLoading.value = false;
	}
});
</script>
