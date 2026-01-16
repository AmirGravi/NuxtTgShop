import { useNuxtApp } from '#app'
import { jwtDecode } from 'jwt-decode'
// import { useCookie } from '#imports'


interface DecodedToken {
    role: string;
    exp?: number;
    iat?: number;
    [key: string]: any;
}

export default defineNuxtRouteMiddleware((to) => {


    const publicPages = ['/' , '/about', '/login', '/error']

    if (useNuxtApp().server) return

    const token = useCookie('token')
    console.log('t' , token.value)

    // لاگین کرده؟ → نذار بره به صفحه لاگین
    if (token.value && ['/login'].includes(to.path)) {
        return navigateTo('/dashboard')
    }

    // صفحه عمومی → مشکلی نیست
    if (publicPages.includes(to.path)) return

    if (!token.value) {
        return navigateTo('/')
    }

    let decoded: DecodedToken
    try {
        decoded = jwtDecode<DecodedToken>(token.value)
    } catch (err) {
        console.error('خطا در دیکود توکن:', err)
        return navigateTo('/login')
    }
    console.log('rws' ,decoded.role)

    // اگر مسیر admin هست → بررسی role
    if (to.path.startsWith('/panel/admin')) {
        console.log(decoded.role)
        if (decoded.role !== 'admin') {
            return navigateTo('/')
        }
    }
})
