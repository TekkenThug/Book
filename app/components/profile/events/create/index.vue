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
		</ul>

		<form>
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
					:min-date="new Date()"
				/>

				<DatePicker
					v-model="duration"
					time-only
					fluid
					placeholder="Duration"
					:step-minute="10"
				/>
			</div>

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
import { toTypedSchema } from "@vee-validate/zod";
import type { AutoCompleteCompleteEvent, AutoCompleteOptionSelectEvent } from "primevue/autocomplete";
import { createEvent } from "~/validation/schemas";
import type { Book } from "~/types/books";
import { mapToInterval } from "~/utils/date";

const authStore = useAuthStore();
const { showErrorToast, showSuccessToast } = useUI();
const suggestedBooks = ref<Book[]>([]);
const searchingBook = ref("");
const isLoading = ref(false);
const searchBooks = async ({ query: title }: AutoCompleteCompleteEvent) => {
	try {
		suggestedBooks.value = await authStore.fetchAPI("/books", { query: { title } });
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

const sendToCreateEvent = handleSubmit(async (values) => {
	if (isLoading.value) {
		return;
	}

	try {
		isLoading.value = true;

		await authStore.fetchAPI("/events", {
			method: "post",
			body: {
				...values,
				datetime: values.datetime.toISOString(),
				duration: mapToInterval(values.duration),
			},
		});

		searchingBook.value = "";
		resetForm();

		showSuccessToast("Event successfully created");
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

.searchPanel {
  width: 420px;
}
</style>
