import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png'
import { useParams } from 'react-router';
import { fetchOneDevice } from '../http/deviceAPI';
import { Context } from '../index';
import { createBasketDevice } from '../http/basketDeviceAPI';

const DevicePage = () => {
    const [oneDevice, setOneDevice] = useState({info: []})
    const {id} = useParams()
    const {device, user} = useContext(Context)

    useEffect(() => {
        fetchOneDevice(id).then(data => setOneDevice(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + oneDevice.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{oneDevice.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, 
                                    width: 240, height: 240, backgroundSize: 'cover',
                                    fontSize: 64}}
                        >
                            {oneDevice.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {oneDevice.price} руб.</h3>
                        <Button 
                            variant={"outline-dark"}
                            onClick={() => {
                                const userId = user.user.id
                                console.log(userId)                                
                                const deviceId = oneDevice.id
                                createBasketDevice({userId: userId, deviceId: deviceId})
                                device.setBasketDevices([])
                                alert(`Товар "${oneDevice.name}" добавлен в корзину`)
                            }}
                        >
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row> 
            <Row  className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {oneDevice.info.map((info, index) =>
                    <Row key={info.id} style={{
                        background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10
                    }}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;