const modules: Record<string, () => Promise<{ default: { vuetifyThemes: any } }>> = import.meta.glob('./*/vuetify.ts')

export async function loadVuetifyThemes(themeName: string) {
    const key = Object.keys(modules).find((path) => path.includes(`/${themeName}/vuetify.ts`))
    if (!key) return null
    const mod = await modules[key]()
    return mod.default.vuetifyThemes
}
