<template>
  <div class="container justify-between flex">
    <div class="bg-blue h-20 bg-slate-500 lg:w-72">
      <ul ref="todoList" class="kanban-column h-10">
        <ListItem
          v-for="(item, key) in todos"
          :key="key"
          :name="item.name"
          v-model="item.amount"
          :primaryList="true"
        />
      </ul>
    </div>
    <div class="bg-blue h-20 bg-slate-300 lg:w-72">
      <ul ref="doneList" class="kanban-column h-10">
        <ListItem
          v-for="(item, key) in dones"
          :key="key"
          :name="item.name"
          v-model="item.amount"
          v-on:update:modelValue="updateValue()"
          :primaryList="false"
        />
      </ul>
    </div>
    {{ test }}
  </div>
</template>

<script lang="ts" setup>
import { Item } from "@/types/Item";
import { Skill } from "@/types/Skill";
import { Category } from "@/types/Category";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { state } from "@formkit/drag-and-drop";
import { ref } from "vue";
import _ from "lodash";
import ListItem from "@/components/ListItem.vue";

const doneItems = ref([
  new Item(
    "Test1",
    new Category("Test", new Skill("ASD", "asd"), "YUB"),
    "cvxcxv",
    173,
    2
  ),
]);

const todoItems = ref([
  new Item(
    "Test12",
    new Category("Test", new Skill("ASD", "asd"), "YUB"),
    "cvxcxv",
    15,
    1
  ),
  new Item(
    "Test122",
    new Category("Test", new Skill("ASD", "asd"), "YUB"),
    "cvxcxv",
    176,
    2
  ),
  new Item(
    "Test13",
    new Category("Test", new Skill("ASD", "asd"), "YUB"),
    "cvxcxv",
    57,
    2
  ),
]);

const [todoList, todos] = useDragAndDrop(todoItems, { group: "todoList" });
const [doneList, dones] = useDragAndDrop(doneItems, { group: "todoList" });

const test = ref(0);

function updateValue() {
  console.log(doneItems.value);

  test.value = _.sumBy(doneItems.value, (x) => x.xp * x.amount);
}

state.on("dragEnded", () => updateValue());
</script>
