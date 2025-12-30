import { defineAsyncComponent } from 'vue'
import { useThemeStore } from '~/stores/theme'

export function resolveThemePage(pageName: string) {
    const themeStore = useThemeStore()
    const theme = themeStore.name || 'classic'

    return defineAsyncComponent(async () => {
        try {
            return await import(`~/themes/${theme}/pages/${pageName}.vue`)
        } catch {
            return await import(`~/themes/classic/pages/${pageName}.vue`)
        }
    })
}
