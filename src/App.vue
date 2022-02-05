<script setup lang="ts">
import { ref, computed } from "vue";
import Select from "@/components/input/Select.vue";
import router from "@/router";

const section = ref("Input Controls");

// const currentSection = computed(() => {
//   switch(router.currentRoute.value)
// })

const onSectionSelect = (value: any) => {
  section.value = value.name;
  router.push({ path: value.code });
};
</script>

<template>
  <nav>
    <h2>UI Components</h2>

    <Select
      @select="onSectionSelect"
      :options="[
        { code: 'input', name: 'Input Controls' },
        { code: 'navigation', name: 'Navigation' },
        { code: 'information', name: 'Information' },
        { code: 'containers', name: 'Containers' },
      ]"
      :value="0"
    />
  </nav>
  <main>
    <section>
      <div class="header">
        <h1>Section</h1>
        <svg
          width="30"
          height="16"
          viewBox="0 0 30 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="right-arrow"
        >
          <path
            d="M29.7071 8.70711C30.0976 8.31658 30.0976 7.68342 29.7071 7.29289L23.3431 0.928932C22.9526 0.538408 22.3195 0.538408 21.9289 0.928932C21.5384 1.31946 21.5384 1.95262 21.9289 2.34315L27.5858 8L21.9289 13.6569C21.5384 14.0474 21.5384 14.6805 21.9289 15.0711C22.3195 15.4616 22.9526 15.4616 23.3431 15.0711L29.7071 8.70711ZM0 9H29V7H0V9Z"
            fill="#000"
          />
        </svg>
        <h1>{{ section }}</h1>
      </div>
      <router-view />
    </section>
  </main>
</template>

<style lang="scss">
@import "@/scss/fonts.scss";

* {
  margin: 0;
  padding: 0;
}

nav {
  display: flex;
  align-items: center;
  gap: 1.2em;
  padding: 2em 3em;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2px var(--subtle-primary-text) solid;
}

main {
  padding: 2em 3em;
}

section {
  .header {
    display: flex;
    gap: 1em;
    align-items: center;
    margin-bottom: 1em;
  }

  .right-arrow path {
    fill: var(--primary-text);
  }
}
</style>
