import {$authHost} from "./index";
import jwt_decode from 'jwt-decode'

export const createBasketDevice = async (userId, deviceId, changeAmount) => {
    const {data} = await $authHost.post('api/basketDevice', userId, deviceId, changeAmount)
    return data
}

export const fetchBasketDevices = async (userId) => {
    const {data} = await $authHost.get('api/basketDevice', {params: {
        userId
    }})
    return data
}

export const deleteBasketDevice = async (userId, deviceId) => {
    const {data} = await $authHost.delete('api/basketDevice', {params: {
        userId, deviceId
    }})
    return data
}

