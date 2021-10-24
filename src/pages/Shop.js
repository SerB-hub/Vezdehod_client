import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import {observer} from 'mobx-react-lite'
import { Context } from '../index';
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')

    const searchDevice = () => {
        device.setSearchField(name)
    }

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 3).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2, null, device.searchField)
        .then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand, device.searchField])
    
    return (
        <Container>
            <Form className="mt-2">
                <Row>
                    <Col>
                    <InputGroup>
                        <FormControl
                            value={name}
                            placeholder="Введите название товара"
                            onChange={e => setName(e.target.value)}
                            aria-label="Введите название товара"
                            aria-describedby="basic-addon1"
                        />
                        <Button variant="outline-dark" id="button-addon2" onClick={() => {
                            searchDevice()
                            console.log(name)
                        }}>
                            Найти
                        </Button>
                    </InputGroup>
                    
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Form>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;