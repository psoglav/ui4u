<template>
  <div class="board" ref="board">
    <h1 class="board__title">Board</h1>
    <div class="board__container">
      <div class="board-stage" v-for="(stage, i) in stages" :key="i">
        <h2 class="board-stage__title">{{ stage }}</h2>
        <div class="board-stage__container">
          <div
            v-for="(task, i) in getStageTasks(stage)"
            :key="i"
            class="board__task"
            @mousedown="onTaskDrag($event, task)"
          >
            <h3 class="board__task__title">{{ task.title }}</h3>
            <p class="board__task__description">{{ task.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { TTask } from "@/ts/types";

const props = defineProps<{
  tasks: TTask[];
}>();

const stages = ref(["not started", "in progress", "review", "completed"]);
const carrying = reactive({} as { el: any });

const getStageTasks = (stage: string) =>
  props.tasks.filter((t) => t.stage == stage);

const onTaskDrag = (e: MouseEvent, task: TTask) => {
  console.log(e);
  carrying.el = e.target;
};

const board = ref(null);

onMounted(() => {
  // let el: any = board.value!;

  // el.addEventListener("mousedown", (e: MouseEvent) => {});

  window.addEventListener("mousemove", (e) => {
    if (carrying.el) {
      carrying.el.style.position = "absolute";
      carrying.el.style.top = e.y + "px";
      carrying.el.style.left = e.x + "px";
      console.log(carrying.el.style.top);
    }
  });
});
</script>

<style lang="scss">
.board {
  position: relative;
  user-select: none;

  &__title {
    margin-bottom: 0.2em;
  }

  &__container {
    display: flex;
    gap: 3em;
  }

  &-stage {
    width: 15em;
    display: flex;
    gap: 0.8em;
    display: flex;
    flex-direction: column;

    &__container {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    &__title {
      text-transform: capitalize;
    }
  }

  &__task {
    border-radius: 0.5em;
    border: 1px var(--primary-text-2) solid;
    width: 100%;
    min-height: 5em;
    padding: 0.8em;
    background-color: var(--primary-bg);

    &__title {
      margin-bottom: 0.6em;
    }

    &:hover {
      background-color: var(--primary-text-1);
    }

    &--moving {
      background-color: var(--primary-bg) !important;
      border: 2px var(--primary-text-3) dashed;

      * {
        display: none;
      }
    }
  }
}
</style>
