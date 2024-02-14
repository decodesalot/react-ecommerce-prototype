import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Col, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { Cart } from '../store/Cart';
import { formatCurrency } from '../../utils';
import emptyCartImage from '../../empty-cart.svg';
import { clearCart } from '../../redux/_store/actions';
export const Header = () => {
    const [show, setShow] = useState(false);
    const [animate, setAnimate] = useState(false);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.store);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    const getTotal = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.price * item.qty; // Assuming each item has a 'price' property
        });
        return formatCurrency(total);
    }

    useEffect(() => {
        if (cart.length > 0) {
            setAnimate(true);
            setTimeout(() => {
                setAnimate(false);
            }, 500); // Adjust this delay to match your CSS animation duration
        }
    }, [cart]);

    return (
        <>
            <Navbar expand="lg" className="bg-white border-bottom">
                <Container>
                    <Navbar.Brand href="#home">eStore-Demo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/products">Products</Nav.Link>
                            <Nav.Item>
                                <Button variant='default' className='notify-shopping-cart' onClick={handleShow}>
                                    <i className="fa-solid fa-shopping-cart" /> {cart.length ? <span className={`notify-icon ${animate ? 'notification-number' : ''}`}>{cart.length}</span> : null}
                                </Button>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='pt-0'>
                    {!cart.length && <div className='empty-cart text-center p-3'><img src={emptyCartImage} alt="empty cart" className='w-50 mx-auto mb-3' /> <p className='mb-0'>Sorry there are no items in your cart <Button variant='default p-0 btn-link link-underline-light' as={Link} to="/products">View Products</Button></p></div>}
                    {cart.length > 0 && <>
                        <p className='fs-6'>{cart.length} Items</p>
                        <div className='cart-preview'>
                            {cart.map(item => <Cart key={JSON.stringify(item)} item={item} />)}
                        </div>
                        <Row className='align-items-center border-top border-bottom py-3 bg-light'>
                            <Col className='text-end'>
                                <h4 className='h5 mb-0'>Total: {getTotal(cart)}</h4>
                            </Col>
                        </Row>
                        <Row className='mt-3 align-items-center'>
                            <Col md={6}>
                                <Button variant='danger' onClick={handleClearCart}>Empty Cart</Button>
                            </Col>
                            <Col md={6} className='text-end'>
                                <Button as={Link} to="/checkout">Checkout</Button>
                            </Col>
                        </Row>
                    </>}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
