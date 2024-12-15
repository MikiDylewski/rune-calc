<template>Hi</template>

<script lang="ts" setup>
import { Item } from "@/types/Item";
import { useRoute } from "vue-router";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { state } from "@formkit/drag-and-drop";
import { ref, defineComponent, Ref } from "vue";
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
const selected3 = ref("");
const doneItems: Ref<Item[]> = ref([]);
const todoItems: Ref<Item[]> = ref([]);
const categories = Object.keys(jsonData);
const routeData = useRoute();
console.log(routeData);
//TODO: Fix the ref
const [todoList, todos] = useDragAndDrop<Item>(todoItems, {
  group: "todoList",
  sortable: false,
});
const [doneList, dones] = useDragAndDrop<Item>(doneItems, {
  group: "todoList",
});

const test = ref(0);
//TODO: Pop already existing items if needed
function loadCategory(category: string) {
  todoItems.value = [];
  if (!(category in jsonData)) return;
  jsonData[category].map((item: any) => {
    if (item.experience["Smithing"] > 0) {
      todoItems.value.push(
        new Item(
          item.id,
          item.name,
          item.isMember,
          item.experience,
          item.skills
        )
      );
    }
  });
}

//TODO: Make this somehow better
function testUpdateAmount() {
  clearAmounts();
  //TODO: add calculating level based on the XP gains
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
        itemAdded = true;
      }
      if (
        remainingXP.value > 0 &&
        doneItems.value[key].experience["Smithing"] >= remainingXP.value
      ) {
        doneItems.value[key].amount += 1;
        remainingXP.value -= doneItems.value[key].experience["Smithing"];
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
