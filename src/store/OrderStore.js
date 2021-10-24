import {makeAutoObservable} from 'mobx';

export default class OrderStore {
    constructor() {
        this._placesOfIssue = ["Заводской район", "Ленинский район"]
        this._paymentMethods = ["Наличными", "Картой"]
        this._orderDevices = []
        this._selectedPlaceOfIssue = null
        this._selectedPaymentMethod = null
        makeAutoObservable(this)
    }

    setPlacesOfIssue(placesOfIssue) {
        this._placesOfIssue = placesOfIssue
    }

    setPaymentMethods(paymentMethods) {
        this._paymentMethods = paymentMethods
    }

    setSelectedPlaceOfIssue(placeOfIssue) {
        this._selectedPlaceOfIssue = placeOfIssue
    }

    setSelectedPaymentMethod(paymentMethod) {
        this._selectedPaymentMethod = paymentMethod
    }

    setOrderDevices(orderDevices) {
        this._orderDevices = orderDevices
    }

    get placesOfIssue() {
        return this._placesOfIssue
    }

    get paymentMethods() {
        return this._paymentMethods
    }

    get selectedPlaceOfIssue() {
        return this._selectedPlaceOfIssue
    }

    get selectedPaymentMethod() {
        return this._selectedPaymentMethod
    }

    get orderDevices() {
        return this._orderDevices
    }
}