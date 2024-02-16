import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import ConfirmationIcon from '../confirmation.svg';
const Confirmation = () => {
    const getConfirmationNumber = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;

        return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * charactersLength))).join('');
    };
    return (
        <>
            <Header />
            <Container className='mt-5'>
                <Row>
                    <Col md={5} className='mx-auto text-center'>
                        <Card>
                            <Card.Body>
                                <img src={ConfirmationIcon} alt="Confirmation Image" className='w-100 mb-3' style={{ maxWidth: 200 }} />
                                <h1 className='h4'>Success, thank you for your order!</h1>
                                <p className='text-muted'>
                                    Your order has been placed and will be processed as soon as possible.

                                    Make sure you make note of your order number, which is <strong className='text-dark'>{getConfirmationNumber(11)}</strong>.

                                    You will be receiving an email shortly with confirmation of your order.
                                </p>
                                <Button as={Link} to="/" className='me-3'>Go back Home</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Confirmation
