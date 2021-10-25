import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Context } from '../index';

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (  
        <Row  className="d-flex" xs="auto">
            {device.brands.map(brand =>
                <Col>
                <Card
                    style={{cursor: 'pointer', borderRadius: 5}} // углы были закругленные
                    key={brand.id}
                    className="p-3"
                    onClick={() => {
                        device.setSearchField('')
                        if (brand.id !== device.selectedBrand.id) {
                            device.setSelectedBrand(brand)
                        } else {
                            device.setSelectedBrand({})
                        }
                    }}
                    border={brand.id === device.selectedBrand.id ? 'dark' : 'light'}
                >
                    {brand.name}
                </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;