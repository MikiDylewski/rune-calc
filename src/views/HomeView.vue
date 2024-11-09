<template>
  <div class="container">
    <div class="bg-blue h-20 bg-slate-500">
      <ul ref="todoList" class="kanban-column h-10">
        <li v-for="(item, key) in todos" :key="key">
          {{ item.name }} / {{ item.category.name }}
          <input
            type="number"
            v-model.number="item.amount"
            @input="updateValue()"
          />
        </li>
      </ul>
    </div>
    <div class="bg-blue h-20 bg-slate-200">
      <ul ref="doneList" class="kanban-column h-10">
        <li v-for="(item, key) in dones" :key="key">
          {{ item.name }} / {{ item.category.name }}
          <input
            type="number"
            v-model.number="item.amount"
            @input="updateValue()"
          />
        </li>
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

const doneItems = ref([
  new Item(
    "Test1",
    new Category("Test", new Skill("ASD", "asd"), "YUB"),
    "cvxcxv",
    15,
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
