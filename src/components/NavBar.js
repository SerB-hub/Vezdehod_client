import React, { useContext, useState } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
//import NavLink from 'react-bootstrap/NavLink'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE, ORDER_ROUTE } from '../utils/consts';
import {Button, Container, Row, Col, Form} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';


const NavBar = observer(() => {
    const {user, device} = useContext(Context)
    const history = useHistory()
    
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Вездеход</NavLink>
                {user.isAuth ?                   
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        
                        
                        <Button
                            variant={"outline-light"} 
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            className="ml-2"
                            variant={"outline-light"} 
                            onClick={() => history.push(BASKET_ROUTE)}                            
                        >
                            Корзина
                        </Button>
                        <Button
                            className="ml-2"
                            variant={"outline-light"} 
                            onClick={() => history.push(ORDER_ROUTE)}                            
                        >
                            Заказы
                        </Button>
                        <Button 
                            className="ml-2"
                            variant={"outline-light"} 
                            onClick={() => logOut()} 
                        >
                            Выйти
                        </Button>
                    </Nav>                   
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>
                            Авторизация
                        </Button>
                    </Nav>
                }               
            </Container>
        </Navbar>
    );
});

export default NavBar;