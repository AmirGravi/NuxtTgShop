import { getCookie, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
    console.log('[theme] middleware start', { url: event.node.req.url })
    const themeCookie = getCookie(event, 'selected-theme')
    const config = useRuntimeConfig()
    let activeTheme = themeCookie || 'classic'

    try {
        console.log('[theme] fetching', { url: `${config.public.apiBase}/theme` })
        const res: any = await $fetch(`${config.public.apiBase}/theme`, {
            headers: event.node.req.headers as any,
        })
        console.log('[theme] fetch ok', { theme: res?.theme })
        const fetchedTheme = res?.theme || 'classic'
        if (fetchedTheme !== activeTheme) {
            activeTheme = fetchedTheme
        }
    } catch (err) {
        console.warn('[theme] fetch failed, using cookie/classic', err)
    }

    if (activeTheme !== themeCookie) {
        setCookie(event, 'selected-theme', activeTheme, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
        })
        console.log('[theme] cookie set', { theme: activeTheme })
    } else {
        console.log('[theme] cookie unchanged', { theme: activeTheme })
    }
    event.context.themeName = activeTheme
})
