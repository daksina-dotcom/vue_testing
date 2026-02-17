import axios from 'axios'
import { createUser } from '@/stores/data'
import Cookies from "js-cookie";

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
})

api.interceptors.request.use((config)=>{
if (!config.url.includes('/login') && !config.url.includes('/signup')) {
        const token = Cookies.get('auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

export default api