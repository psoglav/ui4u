<script setup lang="ts">
import { ref } from "vue";
import Board from "@/components/containers/TaskManager.vue";

const tasks = ref([
  {
    at: +new Date(),
    title: "Ask mom to buy some pineapples",
    stage: "not started",
  },
  {
    at: +new Date(),
    title: "Discuss the current design system w/ Tom",
    description: "We have some issues related to the headings",
    stage: "not started",
  },
  {
    at: +new Date(),
    title: "Everyday push-ups",
    stage: "in progress",
  },
  {
    at: +new Date(),
    title: "Drink water in the morning",
    description: "Wanna be healthy",
    stage: "completed",
  },
]);
</script>

<template>
  <div class="page">
    <Board :tasks="tasks" />
  </div>
</template>
