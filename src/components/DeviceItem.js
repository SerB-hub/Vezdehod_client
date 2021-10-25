import React, { useContext } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router';
import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/consts';
import { Context } from '../index';

const DeviceItem = ({localDevice}) => {
    const history = useHistory()
    const {device} = useContext(Context)

    const BrandBadge = device.brands.filter(brand => brand.id === localDevice.brandId)
    console.log(BrandBadge)
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + localDevice.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + localDevice.img}/>
            <div className="mt-1 d-flex text-black-50 align-items-center justify-content-between">
                <div>{BrandBadge[0].name}</div>
                <div className="d-flex align-items-center">
                    <div>{localDevice.rating}</div>
                    <Image width={14} height={14} src={star}/>
                </div>
            </div>
            <div>{localDevice.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;