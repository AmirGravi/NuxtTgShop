import { useNuxtApp } from '#app'
import { jwtDecode } from 'jwt-decode'


interface DecodedToken {
    role: string;
    exp?: number;
    iat?: number;
    [key: string]: any;
}

export default defineNuxtRouteMiddleware((to) => {


    const publicPages = ['/' , '/about', '/login', '/error']

    if (useNuxtApp().server) return

    const token = localStorage.getItem('token')

    // لاگین کرده؟ → نذار بره به صفحه لاگین
    if (token && ['/login'].includes(to.path)) {
        return navigateTo('/dashboard')
    }

    // صفحه عمومی → مشکلی نیست
    if (publicPages.includes(to.path)) return

    if (!token) {
        return navigateTo('/')
    }

    let decoded: DecodedToken
    try {
        decoded = jwtDecode<DecodedToken>(token)
    } catch (err) {
        console.error('خطا در دیکود توکن:', err)
        return navigateTo('/login')
    }
    console.log(decoded.role)

    // اگر مسیر admin هست → بررسی role
    if (to.path.startsWith('/panel/admin')) {
        console.log(decoded.role)
        if (decoded.role !== 'admin') {
            return navigateTo('/')
        }
    }
})
