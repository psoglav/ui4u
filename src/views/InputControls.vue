<script setup lang="ts">
import Button from "@/components/input/Button.vue";
import Select from "@/components/input/Select.vue";
import { useTheme } from "@/ts/preferences";

const Theme = useTheme();
const onThemeSelect = (value: any) => {
  Theme.change(value.code);
};
</script>

<template>
  <div class="page">
    <Select
      @select="onThemeSelect"
      :options="Theme.all.map((t) => ({ name: t.capitalize(), code: t }))"
      :value="Theme.all.indexOf(Theme.current)"
    />
    <Button @click="Theme.toggle()" :label="Theme.current" />
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  padding: 2em 1em;
  gap: 1em;
}
</style>
