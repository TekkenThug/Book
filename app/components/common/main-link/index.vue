<template>
	<NuxtLink :to="{ name: 'index' }" :class="['h1', $style.link]">
		<img
			src="~/assets/images/orange-book.png"
			alt="book"
			:class="$style.logo"
		>

		Book
	</NuxtLink>
</template>

<style module>
.link {
	width: max-content;
}

.logo {
  width: 40px;
}
</style>
