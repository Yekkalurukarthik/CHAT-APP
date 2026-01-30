import {create} from 'zustand'

export const useThemeStore = create((set) => ({
    theme:localStorage.getItem("themeName") || "coffee",
    setTheme:(theme) => {
        localStorage.setItem("themeName",theme);
        set({ theme });
    },
}))