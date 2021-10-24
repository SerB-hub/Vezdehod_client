import {$authHost} from "./index";
import jwt_decode from 'jwt-decode'

export const createOrder = async (userId, totalPrice, placeOfIssue, paymentMethod, status, amount) => {
    const {data} = await $authHost.post('api/order', userId, totalPrice, placeOfIssue, paymentMethod, status, amount)
    return data
}

export const fetchOrders = async (userId) => {
    const {data} = await $authHost.get('api/order', {params: {
        userId
    }})
    return data
}

export const deleteOrder = async (userId, deviceId) => {
    const {data} = await $authHost.delete('api/order', {params: {
        userId, deviceId
    }})
    return data
}