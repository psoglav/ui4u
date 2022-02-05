import { RootState } from "@/ts/types";
import { createStore } from "vuex";

export default createStore<RootState>({
  state: {
    theme: "dark",
  },
  mutations: {
    SET_THEME(state, value) {
      state.theme = value;
    },
  },
  actions: {},
  getters: {},
});
