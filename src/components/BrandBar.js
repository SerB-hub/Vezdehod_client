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
                    style={{cursor: 'pointer', borderRadius: 0}} // углы были закругленные
                    key={brand.id}
                    className="p-3"
                    onClick={() => {
                        device.setSearchField('')
                        device.setSelectedBrand(brand)
                    }}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;