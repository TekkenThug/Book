<template>
  <NuxtLink :to="{ name: 'index' }" class="h1">
    <img
      src="~/assets/images/orange-book.png"
      alt="book"
      :class="$style.logo"
    >

    Book
  </NuxtLink>
</template>

<style module>
.logo {
  width: 40px;
}
</style>
