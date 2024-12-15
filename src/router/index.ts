import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SkillView from "@/views/SkillView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/smithing",
    name: "smithing",
    component: SkillView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
