<template>
  <section :class="$style.section">
    <div class="container">
      <div :class="$style.wrapper">
        <Menu :model="items" :class="$style.menu">
          <template #item="{ item }">
            <NuxtLink :to="{ name: item.route }" :class="$style.menuItem" :active-class="$style.menuItemActive">
              <span :class="item.icon" />

              <span>{{ item.label }}</span>
            </NuxtLink>
          </template>
        </Menu>

        <NuxtPage />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'profile'
})

const items = ref([
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    route: 'profile-settings',
  },
  {
    label: 'Events',
    icon: 'pi pi-calendar',
    route: 'profile-events',
  }
])
</script>

<style module>
.section {
  padding-top: 40px;
}

.wrapper {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.menu :global(.p-menu-item-content) {
  background-color: transparent;
  overflow: hidden;
}

.menuItem {
  display: flex;
  gap: 10px;
  padding: 10px;
}

.menuItemActive {
  background-color: var(--p-menu-item-focus-background);
}
</style>
