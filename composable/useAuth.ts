// useAuth.ts
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    userId: string
    email: string
    role?: string
    exp: number
    iat: number
}

export default function useAuth() {
    const token = ref<string | null>(localStorage.getItem('token'))
    const user = ref<DecodedToken | null>(null)

    const decodeToken = () => {
        if (!token.value) return null
        try {
            const decoded: DecodedToken = jwtDecode(token.value)
            user.value = decoded
            return decoded
        } catch (err) {
            console.error('خطا در دیکود توکن:', err)
            return null
        }
    }

    const isLoggedIn = () => !!token.value

    const hasRole = (role: string) => {
        const decoded = decodeToken()
        return decoded?.role === role
    }

    const logout = () => {
        localStorage.removeItem('token')
        token.value = null
        user.value = null
    }

    return {
        token,
        user,
        isLoggedIn,
        hasRole,
        decodeToken,
        logout,
    }
}
