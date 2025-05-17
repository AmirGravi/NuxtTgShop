import axios from 'axios';

export default defineNuxtPlugin(() => {
    const instance = axios.create({
        baseURL: 'http://localhost:5000/api'
    })

    return {
        provide: {
            axios: instance
        }
    }
})
