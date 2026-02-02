import { createVuetify } from 'vuetify'
import { defineNuxtPlugin } from '#app'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import adminTheme from '~/themes/admin/vuetify'

export default defineNuxtPlugin(async (nuxtApp) => {
    const themeCookie = useCookie('selected-theme', { default: () => 'classic' })
    const event = process.server ? useRequestEvent() : null
    const serverThemeName = event?.context?.themeName as string | undefined
    const activeThemeName = serverThemeName || themeCookie.value
    let activeThemeConfig: any
    try {
        const themeModule = await import(`~/themes/${activeThemeName}/vuetify`)
        activeThemeConfig = themeModule.default.vuetifyThemes
    } catch (err) {
        const fallbackModule = await import('~/themes/classic/vuetify')
        activeThemeConfig = fallbackModule.default.vuetifyThemes
    }

    const modeCookie = useCookie('app-theme', { default: () => 'system' })

    let initialTheme = 'light'
    if (modeCookie.value === 'dark') {
        initialTheme = 'dark'
    }

    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: initialTheme,
            themes: {
                // ✅ فروشگاه همون قبلی، دست نخورده
                light: { ...activeThemeConfig.light },
                dark: { ...activeThemeConfig.dark },

                // ✅ فقط تم‌های ادمین اضافه می‌شن
                adminLight: { ...adminTheme.light },
                adminDark: { ...adminTheme.dark },
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
