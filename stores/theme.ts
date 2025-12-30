import { loadTheme } from '~/utils/themeLoader'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        name: 'classic',
        config: null as any,
    }),

    actions: {
        async loadFromServer() {
            try {
                const res = await $fetch('/api/theme')
                this.name = res.theme || 'classic'
            } catch {
                this.name = 'classic'
            }

            const module = await loadTheme(this.name)
            this.config = module.default
        },
    },
})
