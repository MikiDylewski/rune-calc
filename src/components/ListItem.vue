<template>
  <li
    class="lg:w-full bg-secondary rounded-md text-textColor border-2 border-slate-700 my-1 list-none m-auto"
    :class="hasRequiredLevel"
  >
    <div class="p-2 flex flex-auto flex-row flex-nowrap w-full">
      <span class="px-2">{{ name }}</span>
      <input
        id="list-item-input"
        v-if="!primaryList"
        class="w-16 bg-primary border-slate-700 border-2 rounded-md ml-auto"
        type="number"
        placeholder="1"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </li>
</template>
<script lang="ts" setup>
import { defineProps, computed } from "vue";
const props = defineProps([
  "modelValue",
  "name",
  "primaryList",
  "currentLevel",
  "requiredLevel",
]);
const hasRequiredLevel = computed(() => {
  return props.currentLevel >= props.requiredLevel
    ? ""
    : "shadow-inner shadow-red-800/90";
});
</script>
