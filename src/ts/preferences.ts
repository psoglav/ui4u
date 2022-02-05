import { computed, ComputedRef } from "vue";
import store from "@/store";
import { TTheme, PreferencesEnum } from "@/ts/types";

class Preferences implements IPreferences {
  private STORAGE_CELL_NAME = "app-preferences";

  constructor(public name: string) {}

  getAll() {
    let storedData = localStorage.getItem(this.STORAGE_CELL_NAME);
    return storedData ? JSON.parse(storedData) : {};
  }

  get() {
    let storedData = localStorage.getItem(this.STORAGE_CELL_NAME);
    return storedData ? JSON.parse(storedData)[this.name] : null;
  }

  set(value: string) {
    let preferences = this.getAll();
    preferences[this.name] = value;
    localStorage.setItem(this.STORAGE_CELL_NAME, JSON.stringify(preferences));
  }
}

class Theme extends Preferences implements ITheme {
  private DARK_MEDIA = "(prefers-color-scheme: dark)";
  private LIGHT_MEDIA = "(prefers-color-scheme: light)";

  public system: TTheme;

  private _current: ComputedRef<TTheme> = computed(() => store.state.theme);
  public all: TTheme[] = [];

  public get current(): TTheme {
    return this._current.value;
  }

  constructor() {
    super(PreferencesEnum.THEME);
    this.system = this.detectSystemTheme();
    this.all = [this.system, this.getOpposite(this.system), "system"];
    this.change(this.get());
    this.all.makeFirst(this.current);
  }

  private getOpposite(theme: TTheme): TTheme {
    return theme == "dark" ? "light" : "dark";
  }

  change(value: TTheme) {
    store.commit("SET_THEME", value);
    this.set(value);

    let isSystemChoice = value == "system";

    if (isSystemChoice && value == this.system) {
      return;
    } else if (isSystemChoice) {
      value = this.system;
    }

    let html: HTMLElement = document.querySelector("html")!;

    if (value == "dark") {
      if (html.hasAttribute("dark")) return;
      html.toggleAttribute("dark");
    } else {
      html.removeAttribute("dark");
    }
  }

  toggle() {
    this.change(this.all.shiftLeft());
  }

  onSystemThemeChange({ matches, media }) {
    if (!matches) return;

    this.system = media === this.DARK_MEDIA ? "dark" : "light";
    this.change("system");
  }

  detectSystemTheme(): TTheme {
    let mqDark = window.matchMedia(this.DARK_MEDIA);
    let mqLight = window.matchMedia(this.LIGHT_MEDIA);

    mqDark.onchange = (e: any) => this.onSystemThemeChange(e);
    mqLight.onchange = (e: any) => this.onSystemThemeChange(e);

    return mqLight.matches ? "light" : "dark";
  }
}

const theme = new Theme();

export const useTheme = () => theme;
