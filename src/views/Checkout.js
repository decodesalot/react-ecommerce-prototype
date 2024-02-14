import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Cart } from '../components/store/Cart';
import { Header } from '../components/layout/Header';
import { formatCurrency } from '../utils';

const Checkout = () => {
    const { cart } = useSelector((state) => state.store);
    const getTotal = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.price * item.qty; // Assuming each item has a 'price' property
        });
        return formatCurrency(total);
    }
    return (
        <>
            <Header />
            <Container className='mb-4'>
                <Row className="my-4 align-items-center">
                    <Col md={8}>
                        <h2 className="h3 m-0">Checkout</h2>
                    </Col>
                    <Col md={4} className="text-end">
                        {cart.length > 0 && <Button as={Link} to="/products">Continue Shopping</Button>}
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Header className="h4 bg-white">
                                Details
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <h4 className="h5">Shipping Address</h4>

                                    <Row className='row-cols-1 row-cols-md-2 g-3 mt-2'>
                                        <Col>
                                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="firstName"
                                                aria-describedby="firstName"
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label htmlFor="firstName">Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="lastName"
                                                aria-describedby="lastName"
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label htmlFor="email">Email Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="email"
                                                aria-describedby="email"
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="phoneNumber"
                                                aria-describedby="phoneNumber"
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label htmlFor="company">Company</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="company"
                                                aria-describedby="company"
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label htmlFor="zipCode">ZIP Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="zipCode"
                                                aria-describedby="zipCode"
                                            />
                                        </Col>
                                    </Row>
                                    <h4 className="h5 mt-4 mb-3">Billing Address</h4>
                                    <Form.Check // prettier-ignore
                                        type="checkbox"
                                        id="billingAddress"
                                        checked
                                        label="Same as shipping address"
                                    />
                                    <h4 className="h5 mt-4 mb-3">Payment Method</h4>
                                    <div className='border p-3 rounded bg-light'>
                                    <Form.Check // prettier-ignore
                                        type="radio"
                                        checked
                                        label={<>
                                        <h5 className='fs-6 mb-1'>Credit / Debit</h5>
                                        <p className='mb-0 text-muted'>Safe money transfer using your bank accou k account. We support Mastercard tercard, Visa, Discover and Stripe.</p></>}
                                    />
                                    <Row className='mt-2 g-3'>
                                        <Col md={12}>
                                            <Form.Label htmlFor="inputCardNumber">Card Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputCardNumber"
                                                aria-describedby="inputCardNumber"
                                                placeholder='1234 4567 6789 4325'
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="inputNameOnCard">Name on card</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputNameOnCard"
                                                aria-describedby="inputNameOnCard"
                                            />
                                        </Col>
                                        <Col md={3}>
                                                <Form.Label htmlFor="inputCardExpiration">Expiry Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    id="inputCardExpiration"
                                                    aria-describedby="inputCardExpiration"
                                                />
                                        </Col>
                                        <Col md={3}>
                                                <Form.Label htmlFor="inputNameOnCard">CVV Code</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="inputNameOnCard"
                                                    aria-describedby="inputNameOnCard"
                                                    placeholder='***'
                                                />
                                        </Col>
                                    </Row>
                                    </div>
                                    <div className='border bg-light p-3 rounded mt-2'>
                                    <Form.Check // prettier-ignore
                                        type="radio"
                                        label={<>
                                            <h5 className='fs-6 mb-1'>Paypal</h5>
                                            <p className='mb-0 text-muted'>You will be redirected to PayPal website to complete your purchase securely.</p></>}
                                    />
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Header className="h4 bg-white">
                                Order Summary
                            </Card.Header>
                            <Card.Body>

                                {cart.map(item => <Cart key={JSON.stringify(item)} item={item} />)}
                                <Row className='row-cols-1 align-items-center border-top border-bottom py-3 bg-light'>
                                    <Col className='text-end'>
                                        <h4 className='h5 mb-0'>Total: {getTotal(cart)}</h4>
                                    </Col>
                                </Row>
                                <Button className='mt-3 w-100'>Proceed to checkout</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Checkout
