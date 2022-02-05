<template>
  <div
    :class="['button', 'button--' + type, { 'button--pointer': pointer }]"
    @click="emit('click', $event)"
  >
    {{ label }}
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["click"]);

defineProps<{
  type?: {
    type: "outline" | "flat";
    default: "outline";
  };
  label: string;
  icon?: string;
  pointer?: boolean;
}>();
</script>

<style lang="scss" scoped>
.button {
  width: min-content;
  height: min-content;
  font-family: Poppins;
  font-size: 1.2em;
  box-sizing: content-box;
  padding: 0.2rem 0.75rem;
  text-align: center;
  display: grid;
  align-content: center;
  border: 1px var(--primary-text-2) solid;
  border-radius: 1.3rem;
  user-select: none;
  filter: invert(black);
  white-space: nowrap;
  color: var(--primary-text);

  &--pointer {
    cursor: pointer;
  }

  &:hover {
    background-color: var(--primary-text-1);
  }

  &:active {
    color: var(--inverted-primary-text);
    background-color: var(--primary-text);
  }
}
</style>
