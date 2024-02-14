import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';

const Home = () => {
  
    return (
        <>
            <Header />
            <div className='top-fold bg-light border-bottom bg-image'>
                <Container>
                    <Row>
                        <Col md={6}>
                            <h1 className='display-4'>Free Shipping on orders over $100</h1>
                            <p className='lead'>Introducing a new model for online grocery shopping and convenient home delivery</p>
                            <Button variant="primary" className='position-relative z-3' as={Link} to="/products">Shop Deals Now</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='py-5 bg-light border-bottom'>
                <Container>
                    <Row className='row-cols-4'>
                        <Col>
                            <i className='fa-regular fa-compass mb-3 fs-2' />
                            <h3 className='h5'>10 minute grocery now</h3>
                            <p className='text-muted mb-0'>
                                Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.
                            </p>
                        </Col>
                        <Col>
                            <i className='fa-regular fa-face-smile mb-3 fs-2' />
                            <h3 className='h5'>Best Prices & Offers</h3>
                            <p className='text-muted mb-0'>
                                Cheaper prices than your local supermarket, great cashback offers to top it off. Get best pricess & offers.
                            </p>
                        </Col>
                        <Col>
                            <i className='fa-regular fa-circle-check mb-3 fs-2' />
                            <h3 className='h5'>Wide Assortment</h3>
                            <p className='text-muted mb-0'>
                                Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg & other categories.
                            </p>
                        </Col>
                        <Col>
                            <i className='fa-regular fa-clock mb-3 fs-2' />
                            <h3 className='h5'>Easy Returns</h3>
                            <p className='text-muted mb-0'>
                                Not satisfied with a product? Return it at the doorstep & get a refund within hours. No questions asked policy.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Home
