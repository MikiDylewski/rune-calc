<template>
  <div class="container justify-between flex">
    <div class="bg-blue h-20 bg-slate-500 lg:w-72">
      <ul ref="todoList" class="kanban-column h-10">
        <ListItem
          v-for="item in todos"
          :key="item.id"
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
    <div class="text-textColor">
      Target xp:
      <input
        id="target-xp-input"
        type="number"
        class="w-16 bg-primary border-slate-700 border-2 rounded-md"
        v-model="targetXP"
        @input="updateValue()"
      />
    </div>
    {{ test }} / {{ remainingXP }}
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

const targetXP = ref(100);
const remainingXP = ref(0);

const doneItems = ref([]);

const todoItems = ref([
  new Item(
    2,
    "Test12",
    new Category(1, "Test", new Skill(1, "ASD", "asd"), "YUB"),
    "cvxcxv",
    15,
    0
  ),
  new Item(
    3,
    "Test122",
    new Category(1, "Test", new Skill(1, "ASD", "asd"), "YUB"),
    "cvxcxv",
    17,
    0
  ),
  new Item(
    4,
    "Test13",
    new Category(1, "Test", new Skill(1, "ASD", "asd"), "YUB"),
    "cvxcxv",
    7,
    0
  ),
]);

const [todoList, todos] = useDragAndDrop(todoItems, { group: "todoList" });
const [doneList, dones] = useDragAndDrop(doneItems, { group: "todoList" });

const test = ref(0);

//TODO: Make this somehow better
function testUpdateAmount() {
  clearAmounts();
  remainingXP.value = targetXP.value;
  doneItems.value = _.orderBy(doneItems.value, (x) => x.xp, ["desc"]);
  while (remainingXP.value > 0) {
    let itemAdded = false;
    for (const key in doneItems.value) {
      if (remainingXP.value < 0) break;
      if (remainingXP.value > doneItems.value[key].xp) {
        doneItems.value[key].amount += 1;
        remainingXP.value -= doneItems.value[key].xp;
        itemAdded = true;
      }
      if (
        remainingXP.value > 0 &&
        doneItems.value[key].xp >= remainingXP.value
      ) {
        doneItems.value[key].amount += 1;
        remainingXP.value -= doneItems.value[key].xp;
        break;
      }
    }
    if (!itemAdded) break;
  }
}

function clearAmounts() {
  for (const key in doneItems.value) {
    doneItems.value[key].amount = 0;
  }
}

function updateValue() {
  testUpdateAmount();
  test.value = _.sumBy(doneItems.value, (x: Item) => x.xp * x.amount);
}

state.on("dragEnded", () => updateValue());
</script>
