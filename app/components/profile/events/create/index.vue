<template>
	<div>
		<h3 :class="['h3', $style.title]">
			Rules of creation
		</h3>

		<ul :class="$style.rules">
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

		<form :class="$style.form">
			<div :class="$style.fields">
				<AutoComplete
					v-model="searchingBook"
					option-label="title"
					placeholder="Enter book title"
					:suggestions="suggestedBooks"
					:panel-class="$style.searchPanel"
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

			<Editor
				v-model="description"
				placeholder="Describe event"
				:class="$style.editor"
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
import Editor from "~/components/ui/editor";
import { eventsService } from "~/services/events";
import { createEvent } from "~/validation/schemas";
import type { Book } from "~/types/books";
import { mapToInterval } from "~/utils/date";
import { booksService } from "~/services/books";

const { showErrorToast, showSuccessToast } = useUI();
const suggestedBooks = ref<Book[]>([]);
const searchingBook = ref("");
const isLoading = ref(false);
const tomorrowDate = add(new Date(), { days: 1 });
const emit = defineEmits<{
	(e: "submit");
}>();
const searchBooks = async ({ query: title }: AutoCompleteCompleteEvent) => {
	try {
		suggestedBooks.value = await booksService.get({ title });
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
};
const selectBook = ({ value }: AutoCompleteOptionSelectEvent) => {
	bookId.value = value.id;
};

const { meta, defineField, handleSubmit, resetForm } = useForm({
	validationSchema: toTypedSchema(createEvent),
});
const [bookId] = defineField("bookId");
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

		await eventsService.create({
			...values,
			datetime: values.datetime.toISOString(),
			duration: mapToInterval(values.duration),
			book_id: values.bookId,
			description: values.description,
		});

		searchingBook.value = "";
		resetForm();

		showSuccessToast("Event successfully created");

		emit("submit");
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
	finally {
		isLoading.value = false;
	}
});
</script>

<style module>
.title {
  margin-bottom: 10px;
}

.rules {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
}

.fields {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.editor {
  margin-bottom: 20px;
}

.searchPanel {
  width: 420px;
}
</style>
