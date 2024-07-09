<template>
  <header :class="$style.header">
    <div class="container">
      <div :class="$style.wrapper">
        <NuxtLink :to="{ name: 'index' }" class="h1">
          <img src="~/assets/images/orange-book.png" alt="book" :class="$style.logo">

          Book
        </NuxtLink>

        <nav>
          <ul>
            <li v-for="link in navigation" :key="link.name" :class="$style.navItem">
              <NuxtLink :to="{ name: link.name }">
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navigation = reactive([
  {
    name: "profile",
    title: "Profile"
  }
])
</script>

<style module>
.header {
  padding: 20px 0;
}

.logo {
  width: 40px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navItem {
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
}
</style>
