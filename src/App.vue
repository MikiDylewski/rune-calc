<template>
  <TopNav />
  <div class="p-4 sm:ml-64 h-screen">
    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 lg:mt-14 h-calcContent"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TopNav from "@/components/TopNav.vue";
</script>
<style>
body {
  background-color: #2a343c;
}
</style>
