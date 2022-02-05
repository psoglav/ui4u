export enum PreferencesEnum {
  THEME = "theme",
}

export type TTheme = "dark" | "light" | "system";

declare module "../preferences" {
  interface IPreferences {
    name: string;
    set(value: string): void;
    get(): string;
    getAll(): object;
  }

  interface ITheme extends IPreferences {
    get current(): TTheme;
    system: TTheme;
    change(value: TTheme): void;
    toggle(): void;
    onSystemThemeChange(value: Record<any, any>): void;
    detectSystemTheme(): TTheme;
  }
}
