import { createVuetify } from 'vuetify'
import { defineNuxtPlugin } from '#app'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import { themes } from '~/themes/index'

export default defineNuxtPlugin((nuxtApp) => {
    const themeMap: any = themes
    const themeCookie = useCookie('selected-theme', { default: () => 'classic' })
    const activeThemeName = themeCookie.value
    const activeThemeConfig = themeMap[activeThemeName]

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
                light: {
                    ...activeThemeConfig.light,
                },
                dark: {
                    ...activeThemeConfig.dark,
                },
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})