<template>
  <div class="container grid grid-cols-3 grid-rows-1 h-full text-textColor">
    <div
      class="bg-blue h-full bg-slate-700 lg:w-96 overflow-auto order-1 border-2 border-contrast border-dashed rounded-lg"
    >
      <ul ref="todoList" class="kanban-column h-full">
        <ListItem
          v-for="item in todos"
          :key="item.id"
          :name="item.name"
          :currentLevel="selected2"
          :requiredLevel="item.skills['Smithing']"
          v-model="item.amount"
          :primaryList="true"
        />
      </ul>
    </div>
    <div
      class="bg-blue h-full bg-slate-700 lg:w-96 overflow-auto order-2 border-2 border-contrast border-dashed rounded-lg"
    >
      <ul ref="doneList" class="kanban-column h-full">
        <ListItem
          v-for="(item, key) in dones"
          :key="key"
          :name="item.name"
          v-model="item.amount"
          :currentLevel="selected2"
          :requiredLevel="item.skills['Smithing']"
          v-on:update:modelValue="updateValue()"
          :primaryList="false"
        />
      </ul>
    </div>
    <div
      class="bg-blue h-full bg-slate-700 lg:w-96 overflow-auto order-3 border-2 border-contrast border-dashed rounded-lg"
    >
      <div class="text-textColor">
        <p>Target Level</p>
        <select
          v-model="selected"
          @change="changeTargetXP()"
          class="w-16 bg-primary border-slate-700 border-2 rounded-md"
        >
          <option v-for="(item, key) in skillData" :key="key" :value="key">
            {{ key }}
          </option>
        </select>
        Target xp:
        <input
          id="target-xp-input"
          type="number"
          class="w-16 bg-primary border-slate-700 border-2 rounded-md"
          v-model="targetXP"
          @input="updateValue()"
        />
      </div>
      <p>Current Level</p>
      <select
        v-model="selected2"
        @change="changeTargetXP()"
        class="w-16 bg-primary border-slate-700 border-2 rounded-md"
      >
        <option v-for="(item, key) in skillData" :key="key" :value="key">
          {{ key }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Item } from "@/types/Item";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { state } from "@formkit/drag-and-drop";
import { ref, defineComponent } from "vue";
import _ from "lodash";
import ListItem from "@/components/ListItem.vue";
import jsonData from "@/data/smithing.json";
import jsonSkillData from "@/data/skill.json";

defineComponent([ListItem]);

const targetXP = ref(100);
const remainingXP = ref(0);
const skillData = ref(jsonSkillData.default);
const selected = ref(1);
const selected2 = ref(1);
const doneItems = ref([]);

const todoItems = ref([]);
jsonData.map((item: Item) => {
  if (item.experience["Smithing"] > 0) {
    todoItems.value.push(
      new Item(item.id, item.name, item.isMember, item.experience, item.skills)
    );
  }
});

const [todoList, todos] = useDragAndDrop(todoItems, { group: "todoList" });
const [doneList, dones] = useDragAndDrop(doneItems, { group: "todoList" });

const test = ref(0);

//TODO: Make this somehow better
function testUpdateAmount() {
  clearAmounts();
  //TODO: add calculating level based on the XP gains
  let imaginaryLevel = selected2.value;
  let imaginaryXP = 0;
  remainingXP.value = targetXP.value;
  doneItems.value = _.orderBy(
    doneItems.value,
    (x) => x.experience["Smithing"],
    ["desc"]
  );
  while (remainingXP.value > 0) {
    let itemAdded = false;

    console.log(doneItems.value.length);
    if (doneItems.value.length === 1) {
      console.log("Asd");
      doneItems.value[0].amount =
        remainingXP.value / doneItems.value[0].experience["Smithing"];
      remainingXP.value = 0;
      break;
    }
    for (const key in doneItems.value) {
      if (remainingXP.value < 0) break;
      if (remainingXP.value > doneItems.value[key].experience["Smithing"]) {
        doneItems.value[key].amount += 1;
        remainingXP.value -= doneItems.value[key].experience["Smithing"];
        imaginaryXP += doneItems.value[key].experience["Smithing"];
        itemAdded = true;
      }
      if (
        remainingXP.value > 0 &&
        doneItems.value[key].experience["Smithing"] >= remainingXP.value
      ) {
        doneItems.value[key].amount += 1;
        remainingXP.value -= doneItems.value[key].experience["Smithing"];
        imaginaryXP += doneItems.value[key].experience["Smithing"];
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
  test.value = _.sumBy(
    doneItems.value,
    (x: Item) => x.experience["Smithing"] * x.amount
  );
}

function changeTargetXP() {
  targetXP.value =
    jsonSkillData.default[selected.value] -
    jsonSkillData.default[selected2.value];
  updateValue();
}

function findLevel(xp: number) {
  // Convert the levels object into an array of [level, xp] and sort by xp in ascending order
  const levelArray = Object.entries(skillData.value).map(([level, xp]) => [
    parseInt(level),
    xp,
  ]);
  levelArray.sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < levelArray.length - 1; i++) {
    const [currentLevel, currentXP] = levelArray[i];
    const [, nextXP] = levelArray[i + 1];

    // Check if the input XP falls within the current range
    if (xp >= currentXP && xp < nextXP) {
      return currentLevel;
    }
  }

  // If the XP is greater than or equal to the highest level's XP, return the highest level
  return levelArray[levelArray.length - 1][0];
}
state.on("dragEnded", () => updateValue());
</script>
