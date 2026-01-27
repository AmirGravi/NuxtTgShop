const modules: Record<string, { default: { vuetifyThemes: any } }> = import.meta.glob('./*/vuetify.ts', { eager: true })

const themes: Record<string, any> = {}

for (const path in modules) {
    const name = path.split('/')[1]
    themes[name] = modules[path].default.vuetifyThemes
}

export { themes }