import { getCookie, setCookie } from 'h3'

const THEME_COOKIE_MAX_AGE_SEC = 60 * 60
const THEME_FETCH_TTL_MS = 60 * 1000
let themeCache: { value: string; expiresAt: number } | null = null

export default defineEventHandler(async (event) => {
    const themeCookie = getCookie(event, 'selected-theme')
    const config = useRuntimeConfig()
    let activeTheme = themeCookie || 'classic'

    try {
        const now = Date.now()
        if (themeCache && themeCache.expiresAt > now) {
            activeTheme = themeCache.value
        } else {
            const res: any = await $fetch(`${config.public.apiBase}/theme`, {
                headers: event.node.req.headers as any,
            })
            activeTheme = res?.theme || 'classic'
            themeCache = {
                value: activeTheme,
                expiresAt: now + THEME_FETCH_TTL_MS,
            }
        }
    } catch (err) {
        activeTheme = themeCookie || 'classic'
    }

    setCookie(event, 'selected-theme', activeTheme, {
        path: '/',
        maxAge: THEME_COOKIE_MAX_AGE_SEC,
    })

    event.context.themeName = activeTheme
})
