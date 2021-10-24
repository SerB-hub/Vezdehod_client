import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap';
import { Context } from '../index';
import { createBasketDevice, fetchBasketDevices, deleteBasketDevice } from '../http/basketDeviceAPI';
import { fetchDevices } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import trash from '../assets/trash.png'
import arrowDown from '../assets/arrow_down.png'
import arrowUp from '../assets/arrow_up.png'
import CreateOrder from '../components/modals/CreateOrder';

const Basket = observer(() => {
    const {device, user} = useContext(Context)
    const [basketDeviceId, setBasketDeviceId] = useState([-1])

    const [trashActive, setTrashActive] = useState(false)
    const [selectedTrash, setSelectedTrash] = useState(-1)

    const [arrowUpActive, setArrowUpActive] = useState(false)
    const [selectedArrowUp, setSelectedArrowUp] = useState(-1)

    const [arrowDownActive, setArrowDownActive] = useState(false)
    const [selectedArrowDown, setSelectedArrowDown] = useState(-1)

    const[deleteDevice, setDeleteDevice] = useState(false)
    const[changeAm, setChangeAm] = useState(false)

    const [amount, setAmount] = useState(0)
    const [total, setTotal] = useState(0)

    const [orderVisible, setOrderVisible] = useState(false)

    useEffect(() => {
        console.log(basketDeviceId)
        setDeleteDevice(false)
        fetchBasketDevices(user.user.id).then(data => {
                if (data.length != 0) {
                    let array = []
                    let amountDict = {}
                    for (let i=0; i < data.length; i++) {
                        array.push(data[i].deviceId) 
                        amountDict[data[i].deviceId] = data[i].amount
                    }
                    const arrayToString = array.join('-')
                    //const amountArrayToString = amountArray.join('-')
                    //const commonArrayToString = `${arrayToString}--${amountArrayToString}`
                    setBasketDeviceId(arrayToString)
                    setAmount(amountDict)
                    console.log(amountDict)
                } else {
                    setBasketDeviceId([-1])
                }

                //setTimeout(() => {
                fetchDevices(null, null, 1, 100, basketDeviceId).then(data => {
                    device.setBasketDevices(data.rows) // device.setBasketDevices | setDevices
                    setChangeAm(false)
                })
                //})
            })
             
    }, [basketDeviceId[0], basketDeviceId.length, deleteDevice, changeAm])

    useEffect(() => {    
        let totalSum = device.basketDevices.reduce((sum, current) => {
                return sum + (+(current.price) * +(amount[current.id]))
            }, 0)
        setTotal(totalSum)
        setChangeAm(false)
    }, [])  

    return (
        <Container className="mt-3">
            <Row className="mt-2">
                <Col md={12}>
                <div className="mb-2" style={{fontSize: 32}}>
                    Корзина
                </div>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={9}>
                    
                    <ListGroup>
                        {basketDeviceId[0] != -1 ? // device.basketDevices 
                            device.basketDevices.map(item => // device.basketDevices | devices
                            <ListGroup.Item 
                                key={item.id}
                            >
                                <Row className="align-items-center justify-content-between" key={item.id}>
                                    <Col>
                                    <Image width={60} height={60} src={process.env.REACT_APP_API_URL + item.img}/>
                                    </Col>
                                    <Col>
                                        {item.name}
                                    </Col>
                                    <Col>
                                        <Card 
                                            //key={item.id}
                                            style={{ width: '40px' }}
                                            onMouseEnter={() => {
                                                setSelectedArrowUp(item.id)
                                                setArrowUpActive(true)                             
                                            }}
                                            onMouseLeave={() => {
                                                setSelectedArrowUp(-1)
                                                setArrowUpActive(false)
                                            }}
                                            onClick={() => {
                                                const userId = user.user.id
                                                console.log(userId)                                
                                                const deviceId = item.id
                                                const changeAmount = "decrease"
                                                createBasketDevice({userId: userId, deviceId: deviceId})
                                                setChangeAm(true)
                                            }}
                                            border={(arrowUpActive && (item.id === selectedArrowUp)) ? 'success' : 'light'}
                                        >
                                            <Button className="p-1 m-0"                       
                                                style={{                                      
                                                    background: "white", 
                                                    border: "white",
                                                    cursor: "pointer",
                                                }}                                                                   
                                            >
                                                <Image 
                                                //width={(arrowUpActive && (item.id === selectedArrowUp)) ? 28 : 24} 
                                                //height={(arrowUpActive && (item.id === selectedArrowUp)) ? 28 : 24} 
                                                width={24}
                                                height={24}
                                                src={arrowUp}/>
                                            </Button>
                                            </Card>                            
                                        {`${amount[item.id]} шт.`}
                                        <Card 
                                                //key={item.id}
                                                style={{ width: '40px' }}
                                                onMouseEnter={() => {
                                                    setSelectedArrowDown(item.id)
                                                    setArrowDownActive(true)                             
                                                }}
                                                onMouseLeave={() => {
                                                    setSelectedArrowDown(-1)
                                                    setArrowDownActive(false)
                                                }}
                                                onClick={() => {
                                                    const userId = user.user.id
                                                    console.log(userId)                                
                                                    const deviceId = item.id
                                                    const changeAmount = "decrease"
                                                    createBasketDevice({userId: userId, deviceId: deviceId, changeAmount: changeAmount})
                                                    setChangeAm(true)
                                                }}
                                                border={(arrowDownActive && (item.id === selectedArrowDown)) ? 'success' : 'light'}
                                            >
                                                <Button className="p-1 m-0"                       
                                                    style={{                                      
                                                        background: "white", 
                                                        border: "white",
                                                        cursor: "pointer",
                                                    }}                                                                   
                                                >
                                                    <Image width={24} height={24} src={arrowDown}/>
                                                </Button>
                                                </Card>
                                    </Col>
                                    <Col>
                                        {   
                                            `${+(item.price) * +(amount[item.id])} руб.`
                                        }
                                    </Col>
                                    <Col className="ml-auto">
                                        <Card 
                                            //key={item.id}
                                            style={{ width: '50px' }}
                                            onMouseEnter={() => {
                                                setSelectedTrash(item.id)
                                                setTrashActive(true)                             
                                            }}
                                            onMouseLeave={() => {
                                                setSelectedTrash(-1)
                                                setTrashActive(false)
                                            }}
                                            onClick={() => {
                                                const userId = user.user.id
                                                const deviceId = item.id
                                                deleteBasketDevice(userId, deviceId)
                                                setDeleteDevice(true)
                                                alert(`Товар "${item.name}" удален из корзины`)
                                            }}
                                            border={(trashActive && (item.id === selectedTrash)) ? 'danger' : 'light'}
                                        >
                                            <Button className="p-1 m-0"                       
                                                style={{                                      
                                                    background: "white", 
                                                    border: "white",
                                                    cursor: "pointer",
                                                }}                                                                   
                                            >
                                                <Image width={32} height={32} src={trash}/>
                                            </Button>
                                        </Card>                                             
                                    </Col>
                                </Row>
                            </ListGroup.Item>)
                            :
                            <div className="d-flex justify-content-center align-items-center">
                                Корзина пуста
                            </div>
                        }
                    </ListGroup>
                    
                </Col>
                <Col md={3} className="w">                   
                    <Card className="d-flex justify-content-center align-items-center">
                        <div className="m-2" 
                                style={{fontSize: 24}}
                            >
                            Сумма заказа: {device.basketDevices.reduce((sum, current) => {
                            return sum + (+(current.price) * +(amount[current.id]))
                            }, 0)} рублей
                        </div>
                        {basketDeviceId[0] != -1 ?
                            <Button className="p-2 m-2"  
                                variant={"outline-dark"} 
                                onClick={() => setOrderVisible(true)}                    
                                style={{                                      
                                //    background: "white", 
                                //    border: "white",
                                //    cursor: "pointer",
                                }}                                                                   
                            >
                                Оформить заказ
                            </Button>
                        :
                            <div className="m-2"/>
                        }
                    </Card>
                    

                </Col>
            </Row>
            <CreateOrder amount={amount} total={device.basketDevices.reduce((sum, current) => {
                            return sum + (+(current.price) * +(amount[current.id]))
                            }, 0)} show={orderVisible} onHide={() => setOrderVisible(false)}
                            deleteDevice={() => setDeleteDevice(true)}/>
        </Container>
    );
});

export default Basket;