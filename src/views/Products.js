import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, InputGroup, Form, Row } from "react-bootstrap";
import { api } from '../utils/api';
import styles from '../styles/products.module.scss';
import { formatCurrency } from "../utils";
import { Header } from "../components/layout/Header";
import { ProductDetails } from "../components/store/ProductDetails";
import { addToCart } from "../redux/_store/actions";
const Products = () => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { cart } = useSelector((state) => state.store);
    const dispatch = useDispatch();
    // range 
    const [priceRange, setPriceRange] = useState([0, 1000]); // Initial price range

    const renderStars = (rate) => {
        const stars = [];
        const roundedRate = Math.round(rate); // Round the rate to the nearest integer

        // Fill stars array based on rounded rate
        for (let i = 0; i < 5; i++) {
            if (i < roundedRate) {
                stars.push(<i key={i} className="fa fa-star fa-xs active"></i>); // Solid star
            } else {
                stars.push(<i key={i} className="far fa-star fa-xs active"></i>); // Empty star
            }
        }

        return stars;
    };

    const handleRangeChange = (event) => {
        const newMaxPrice = Number(event.target.value);
        const newPriceRange = [priceRange[0], newMaxPrice];
        setPriceRange(newPriceRange);
    };
    const handleChange = () => {
        console.log('field changed');
    }
    const fetchProducts = async () => {
        try {
            const response = await api('/products');
            setProducts(response);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    const addItem = (item) => dispatch(addToCart(item));
    const isItemSelected = (item) => cart.some(({ id }) => item.id === id);
    const handleClose = () => setShow(false);
    const handleShow = (product) => {
        setSelectedProduct(product);
        setShow(true);
    };

    const handleSearchChange = ({ target: { value } }) => setSearchQuery(value);
    const productsToDisplay = searchQuery
        ? products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : products;
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <>
            <Header />
            <Container>
                <Row className="my-4">
                    <Col md={3}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search products"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                aria-label="Search products"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <h3 className="h5">Categories</h3>
                        {[...new Set(products.map(({ category }) => category))].map((category, idx) =>
                            <Form.Check
                                key={`${category}-${idx}`}
                                type="checkbox"
                                label={category}
                                onChange={handleChange}
                                className="text-capitalize"
                            />)}
                        <h3 className="h5 mt-3">Price Range</h3>
                        <Form>
                            <Form.Range
                                value={priceRange[1]}
                                onChange={handleRangeChange}
                                min={priceRange[0]}
                                max={1000}
                                step={5}
                            />
                            <Form.Label>{formatCurrency(priceRange[1] >= 500 ? priceRange[1] - 500 : priceRange[0])} - {formatCurrency(priceRange[1])}</Form.Label>
                        </Form>
                        <h3 className="h5 mt-3">Rating</h3>
                        {[5, 4, 3, 2, 1].map((rate, idx) =>
                            <Form.Check
                                key={`${rate}-${idx}`}
                                type="checkbox"
                                label={renderStars(rate)}
                                onChange={handleChange}
                                className="text-capitalize"
                            />)}
                    </Col>
                    <Col md={9}>
                        <Row className="g-3 row-cols-md-4 align-items-center mb-3">
                            <Col md={8}>
                                <h2 className="h3 m-0">{products.length} Products</h2>
                            </Col>
                            <Col md={4} className="text-end">
                                <Form.Label className="d-inline-block me-3 fw-semibold">Sort by</Form.Label>
                                <Form.Select aria-label="Default select example" className="d-inline-block w-75">
                                    <option value="1">Price: Low to High</option>
                                    <option value="2">Price: High to Low</option>
                                    <option value="3">Rating: Low to High</option>
                                    <option value="3">Rating: High to Low</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="g-3 row-cols-md-4 align-items-center">
                            {products && productsToDisplay.map(({ title, price, image }, idx) =>
                                <Col key={title}>
                                    <Card className={`${styles.productCard} h-100`}>
                                        <Card.Body>
                                            <div className={styles.imageWrapper}>
                                                <Button variant="default" onClick={() => handleShow(products[idx])}>
                                                    <img src={image} alt={title} className="img-fluid" style={{ maxHeight: '100px', maxWidth: '100px' }} />
                                                </Button>
                                            </div>
                                            <Button variant="default p-0 text-start" className={styles.title} onClick={() => handleShow(products[idx])}>
                                                {title}
                                            </Button>
                                            <Row className={`align-items-center ${styles.cardFooter}`}>
                                                <Col md={6}>
                                                    <p className="mb-0 fw-semibold">{formatCurrency(price)}</p>
                                                </Col>
                                                <Col md={6} className="text-end">
                                                    {isItemSelected(products[idx]) ?
                                                        <Button variant="success" className="btn-sm btn-disabled" disabled onClick={() => addItem(products[idx])}>
                                                            <i className="fa-solid fa-check" /> In Cart
                                                        </Button>
                                                        :
                                                        <Button variant="primary" className="btn-sm" onClick={() => addItem(products[idx])}>
                                                            <i className="fa-solid fa-plus" /> Add
                                                        </Button>
                                                    }

                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}

                        </Row>
                    </Col>
                </Row>
            </Container>
            {show && <ProductDetails show={show} isSelected={isItemSelected(selectedProduct)} handleClose={handleClose} selectedProduct={selectedProduct} addItem={addItem} />}
        </>
    )
}

export default Products
