import React, { useState, useContext } from 'react';
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {registration, login} from '../http/userAPI'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log(location)
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(username, phone, email, password)
            }    
            user.setUser(data) // user
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                {isLogin ? 
                <Form className="d-flex flex-column"> 
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Col>
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                        </Col>
                        <Button 
                            className="mt-2"
                            variant={"outline-success"}
                            onClick={click}
                        >
                            Войти 
                        </Button>
                        
                    </Row>
                </Form>
                :
                <Form className="d-flex flex-column"> 
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваше имя..."
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш номер телефона..."
                            value={phone}
                            onChange={e => setPhone(e.target.value)}                           
                        />
                        
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Col>
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        </Col>
                        
                        <Button 
                            className="mt-2"
                            variant={"outline-success"}
                            onClick={click}
                        >
                            Регистрация
                        </Button>
                        
                    </Row>
                </Form>
                }               
            </Card>
        </Container>
    );
});

export default Auth;