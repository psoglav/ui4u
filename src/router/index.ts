import { createRouter, createWebHistory } from "vue-router";
import InputControls from "@/views/InputControls.vue";
import Containers from "@/views/Containers.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    name: "InputControls",
    path: "/input",
    component: InputControls,
  },
  {
    name: "Containers",
    path: "/containers",
    component: Containers,
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
