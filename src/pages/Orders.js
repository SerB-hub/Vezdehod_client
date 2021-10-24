import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { Context } from '../index';
import { fetchOrders } from '../http/orderAPI';


const Orders = observer(() => {
    const {user} = useContext(Context)
    const [orders, setOrders] = useState()

    useEffect(() => {
        fetchOrders(user.user.id).then(data => {
            setOrders(data)
        })
    }, [])

    return (
        <Container className="d-flex flex-column">
            <Row className="mt-2">
                <Col md={12}>
                <div className="mb-2" style={{fontSize: 32}}>
                    Мои заказы
                </div>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    
                    <ListGroup>
                        <ListGroup.Item variant="dark">
                            <Row className="align-items-center justify-content-between">
                                <Col md={1}>
                                    ID 
                                </Col>
                                <Col>
                                    Дата создания
                                </Col>
                                <Col>
                                    Сумма к оплате
                                </Col>
                                <Col>
                                    Пункт получения
                                </Col>
                                <Col>
                                    Способ оплаты
                                </Col>
                                <Col>
                                    Статус
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {orders ? 
                            orders.map(order => 
                            <ListGroup.Item 
                                key={order.id}
                            >
                                <Row className="align-items-center justify-content-between" key={order.id}>
                                    <Col md={1}>
                                        {order.id}
                                    </Col>
                                    <Col>
                                        {`${order.totalPrice} руб.`}
                                    </Col>
                                    <Col>
                                        {order.createdAt}
                                    </Col>
                                    <Col>
                                        {order.placeOfIssue}
                                    </Col>
                                    <Col>
                                        {order.paymentMethod}
                                    </Col>
                                    <Col className="ml-auto">
                                        <Card 
                                            style={{width: 'auto'}}
                                            className={(order.status === "Новый") ? "text-info border-info border-2 text-center" 
                                            : (order.status === "В обработке") ? "text-primary border-primary border-2 text-center"
                                            : (order.status === "Готов") ? "text-success border-success border-2 text-center"
                                            : (order.status === "Отменен") ? "text-danger border-danger border-2 text-center"
                                            : "text-secondary border-secondary text-center"}
                                            //border={(order.status === "Новый") ? "#17a2b8" : ""}
                                        >
                                            <strong>{order.status}</strong>
                                        </Card>                                             
                                    </Col>
                                </Row>
                                <hr/>
                                {order.devices.map(item => {
                                        
                                    <Row className="align-items-center justify-content-between" key={item.deviceId}>
                                        <Col>
                                            {item.deviceId}
                                        </Col>
                                        <Col>
                                            {item.amount}
                                        </Col>
                                    </Row>
                                
                                })}
                            </ListGroup.Item>)
                            :
                            <div className="d-flex justify-content-center align-items-center">
                                У вас еще нет заказов
                            </div>
                        }
                    </ListGroup>
                    
                </Col>
                
            </Row>
        </Container>
    );
});

export default Orders;