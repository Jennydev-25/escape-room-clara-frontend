import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'))
    const refreshToken = ref(localStorage.getItem('refreshToken'))

    function setSession(newToken, newRefreshToken) {
        token.value = newToken
        refreshToken.value = newRefreshToken
        localStorage.setItem('token', newToken)
        localStorage.setItem('refreshToken', newRefreshToken)
    }

    function logout() {
        token.value = null
        refreshToken.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    }

    return { token, refreshToken, setSession, logout }
})
