<template>
	<Editor
		v-model="model"
		:placeholder
		:class="$style.editor"
		:editor-style="styles"
	>
		<template #toolbar>
			<span class="ql-formats">
				<button
					v-tooltip.bottom="'Heading'"
					class="ql-header"
					value="1"
				/>

				<button
					v-tooltip.bottom="'Heading'"
					class="ql-header"
					value="2"
				/>

				<button
					v-tooltip.bottom="'Heading'"
					class="ql-header"
					value="3"
				/>
			</span>

			<span class="ql-formats">
				<button v-tooltip.bottom="'Bold'" class="ql-bold" />
				<button v-tooltip.bottom="'Italic'" class="ql-italic" />
				<button v-tooltip.bottom="'Underline'" class="ql-underline" />
			</span>

			<span class="ql-formats">
				<button
					v-tooltip.bottom="'Ordered list'"
					class="ql-list"
					value="ordered"
				/>
			</span>

			<span class="ql-formats">
				<button v-tooltip.bottom="'Link'" class="ql-link" />
			</span>
		</template>
	</Editor>
</template>

<script setup lang="ts">
import Editor from "primevue/editor";

const props = withDefaults(defineProps<{ height?: number; placeholder?: string }>(), { height: 320 });
const model = defineModel<string>();

const styles = computed<Record<string, string>>(() => ({
	height: `${props.height}px`,
}));
</script>

<style module>
.editor :global(.ql-editor.ql-blank::before) {
  color: var(--app-text-color);
}

.editor strong {
  font-weight: 600;
}

.editor em {
  font-style: italic;
}

.editor u {
  text-decoration: underline;
}
</style>
