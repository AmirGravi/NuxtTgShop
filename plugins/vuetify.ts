import { createVuetify } from 'vuetify'
import { defineNuxtPlugin } from '#app'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import { useThemeLoader } from '@/composable/useThemeLoader'

export default defineNuxtPlugin(nuxtApp => {
    const { currentTheme } = useThemeLoader()

    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: 'light',
            themes: currentTheme.value.vuetifyThemes,
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
