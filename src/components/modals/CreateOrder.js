import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { Context } from '../../index';
import { createOrder } from '../../http/orderAPI';
import { deleteBasketDevice } from '../../http/basketDeviceAPI';
import { observer } from 'mobx-react-lite';


const CreateOrder = observer(({amount, total, show, onHide, deleteDevice}) => {
    const {user, order} = useContext(Context)

    useEffect(() => {
        //fetchTypes().then(data => device.setTypes(data))
        //fetchBrands().then(data => device.setBrands(data))
    }, [])


    const addOrder = () => {
        const formData = new FormData()
        formData.append('userId', user.user.id)
        formData.append('totalPrice', `${total}`)
        formData.append('placeOfIssue', order.selectedPlaceOfIssue)
        formData.append('paymentMethod', order.selectedPaymentMethod)
        formData.append('status', "Новый")
        formData.append('amount', JSON.stringify(amount))
        createOrder(formData).then(data => onHide())
    }

    return (
        <Modal 
            show={show}  
            onHide={{onHide}}        
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Оформить заказ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-between">
                <Col className="m-0">{`Получатель: ${user.user.username}`}</Col> 
                <Col className="m-0">{`Сумма заказа: ${total} руб.`}</Col> 
                </Row>
                {
                // нужно имя юзера
                }
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{order.selectedPlaceOfIssue || "Выберите пункт получения"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {order.placesOfIssue.map(placeOfIssue =>
                                <Dropdown.Item 
                                    onClick={() => order.setSelectedPlaceOfIssue(placeOfIssue)} 
                                    key={Date.now()}
                                >
                                    {placeOfIssue}
                                </Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{order.selectedPaymentMethod || "Выберите способ оплаты"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {order.paymentMethods.map(paymentMethod =>
                                <Dropdown.Item 
                                    onClick={() => order.setSelectedPaymentMethod(paymentMethod)} 
                                    key={Date.now()}
                                >
                                    {paymentMethod}
                                </Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" 
                    onClick={() => {
                        const userId = user.user.id
                        const deviceId = -1
                        addOrder()
                        alert("Заказ оформлен")
                        onHide()
                        //deleteBasketDevice(userId, deviceId)
                        //deleteDevice()                        
                    }
                    }
                >
                    Оформить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateOrder;