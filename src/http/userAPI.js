import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (username, phone, email, password) => {
    const {data} = await $host.post('api/user/registration', {username, phone, email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async (username, phone, email, password) => {
    const {data} = await $authHost.get('api/user/auth', username, phone, email, password)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}