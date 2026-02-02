import { defineStore } from 'pinia'
import { loadTheme } from '@/utils/themeLoader'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        name: 'classic',
        config: null as any,
    }),
    actions: {
        async loadThemeModule(themeName: string) {
            this.name = themeName
            const module = await loadTheme(themeName)
            this.config = module.default
        },
    },
})
