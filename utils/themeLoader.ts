export async function loadTheme(themeName: string) {
    try {
        return await import(`~/themes/${themeName}/index.ts`)
    } catch (err) {
        console.warn(`Theme "${themeName}" not found, fallback to classic`)
        return await import('~/themes/classic/index')
    }
}
