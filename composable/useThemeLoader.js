import { ref, onMounted } from 'vue'

const currentTheme = ref({
    name: 'classic',
    hasDarkMode: false,
    vuetifyThemes: {}
})

export function useThemeLoader() {
    const setTheme = async (themeName) => {
        try {
            const themeModule = await import(`@/assets/themes/${themeName}/theme.js`)
            currentTheme.value = themeModule.default
        } catch (err) {
            console.error('Theme not found', err)
        }
    }

    const loadThemeFromServer = async () => {
        try {
            console.log("as")
            const res = await fetch('/api/theme')  // بک‌اند تم فعال رو میده
            const data = await res.json()
            await setTheme(data.theme || 'classic')
        } catch (err) {
            console.warn('Failed to load theme from server, using classic')
            await setTheme('classic')
        }
    }

    onMounted(loadThemeFromServer)

    return { currentTheme, setTheme, loadThemeFromServer }
}


export const loadPage = async (pageName) => {
    try {
        const module = await import(`@/assets/themes/${currentTheme.value.name}/pages/${pageName}.vue`)
        return module.default
    } catch {
        // fallback به pages اصلی
        const module = await import(`@/pages/${pageName}.vue`)
        return module.default
    }
}
