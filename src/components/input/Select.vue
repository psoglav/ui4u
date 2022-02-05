<template>
  <div class="input-select__wrap" :style="{ width, zIndex: opened ? 2 : 0 }">
    <div :class="['input-select', { opened }]" ref="selectEl">
      <div
        class="input-select__option--selected"
        @click="toggle"
        tabindex="0"
        @keypress.enter="toggle"
        @keypress.space="toggle"
      >
        <span>{{ selected.name }}</span>
        <div class="input-select__arrow-button">
          <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
            <path
              d="M16.2224 1.77764L8.77759 9.22241L1.33282 1.77764"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      <div
        class="input-select__option"
        v-for="(option, i) of excludeSelected"
        @click="select(option)"
        tabindex="0"
        @keypress.enter="select(option)"
        @keypress.space="select(option)"
        :key="i"
      >
        <span>{{ option.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  PropType,
} from "vue";
import { onClickOutside } from "@/ts/utils";

export default defineComponent({
  props: {
    value: {
      type: Number,
    },
    width: {
      type: String,
      default: "max-content",
    },
    options: {
      type: Array as PropType<{ code: string; name: string }[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectEl = ref(null);
    const opened = ref(false);
    const selected = ref(props.options[0]);
    const excludeSelected = computed(() =>
      props.options?.filter((s) => s.code != selected.value.code)
    );

    watch(
      () => props.value,
      (v) => props.options[v!]
    );

    const select = (option: any) => {
      if (!opened.value) return;
      selected.value = option;
      opened.value = false;
      emit("select", selected.value);
    };

    const toggle = () => {
      opened.value = !opened.value;
    };

    onMounted(() => {
      onClickOutside(selectEl.value!, () => (opened.value = false));
    });

    return {
      select,
      toggle,
      opened,
      selected,
      excludeSelected,
      selectEl,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-select__wrap {
  position: relative;
  height: 2.73em;
}

.input-select {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  font-size: 1.2em;
  box-sizing: border-box;
  padding: 0.6em 0;
  top: -0.6em;

  min-width: min-content;
  width: 100%;
  user-select: none;
  position: absolute;
  pointer-events: none;

  &.opened {
    pointer-events: all;
  }

  &__arrow-button {
    position: absolute;
    right: 0.35em;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5em;
    height: 1.5em;
    background-color: var(--primary-text-1);
    border-radius: 100%;
    display: block;

    svg {
      position: absolute;
      right: 50%;
      top: 50%;
      transform: translate(45%, -40%) scale(0.8);
      transform-origin: 77% 20%;
      width: 60%;
      height: 60%;

      path {
        stroke: var(--primary-text-3);
      }
    }
  }

  &.opened &__arrow-button {
    svg {
      transform: rotate(180deg) scale(0.8);
    }
  }

  &__option,
  &__option--selected {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    min-width: 7em;
    border-radius: 1.1em;
    padding: 0.5em 0.75em;
    padding-right: 2.2em;
    display: flex;
    justify-content: space-between;
    // background-color: var(--primary-bg);
    z-index: 1;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__option {
    opacity: 0;
    transform: scale(0.8);

    &:hover {
      background-color: var(--primary-text-1);
    }
  }

  &__option--selected {
    opacity: 1;
    pointer-events: all;
    border: 1px var(--primary-text-2) solid;

    &:hover {
      background-color: var(--primary-text-1);
    }

    &:active {
      background-color: var(--primary-text-2) !important;
    }
  }

  &__option--selected:hover &__arrow-button {
    background-color: var(--primary-text-2);

    svg path {
      stroke: var(--primary-text-5);
    }
  }

  &::after {
    content: "";
    opacity: 0;
    position: absolute;
    inset: 0;
    left: -0.6em;
    width: calc(100% + 1.2em);
    height: 100%;
    border-radius: 1.6em;
    background-color: var(--primary-bg);
    border: 1px var(--primary-text-1) solid;
    box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.03),
      0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0215656),
      0px 22.3363px 17.869px rgba(0, 0, 0, 0.0178832),
      0px 12.5216px 10.0172px rgba(0, 0, 0, 0.015),
      0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0121168),
      0px 2.76726px 2.21381px rgba(0, 0, 0, 0.00843437);
    // transition: transform 0.1s ease, opacity 0.15s ease;
  }

  &.opened::after,
  &.opened &__option {
    opacity: 1;
    transform: scale(1);
  }

  &.opened &__option--selected {
    background-color: var(--primary-text-1);
  }
}
</style>
