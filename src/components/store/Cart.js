import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { formatCurrency } from '../../utils';
import { removeFromCart, updateQuantity } from '../../redux/_store/actions';

export const Cart = ({ item }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(item.qty || 1);
    const removeItem = () => dispatch(removeFromCart(item));

    const handleIncrement = () => {
        const newQuantity = quantity + 1; // Increment quantity
        setQuantity(newQuantity); // Update quantity state
        dispatch(updateQuantity(item.id, newQuantity)); // Dispatch updateQuantity action
    }

    const handleDecrement = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1; // Decrement quantity, ensuring it doesn't go below 1
        setQuantity(newQuantity); // Update quantity state
        dispatch(updateQuantity(item.id, newQuantity)); // Dispatch updateQuantity action
    }

    const handleChange = ({target: {value}}) => {
        setQuantity(parseInt(value));
        dispatch(updateQuantity(item.id, value)); // Dispatch updateQuantity action
    }

    return (
        <Row className='border-bottom py-2 g-3 item'>
            <Col md={2}>
                <img src={item.image} alt={item.title} className='img-fluid' />
            </Col>
            <Col md={6}>
                <h2 className='h6 m-0'>{item.title}</h2>
                <Button variant='default' className='p-0 text-danger h6' onClick={removeItem}><i className='fa-solid fa-trash fa-xs' /> Remove</Button>
            </Col>
            <Col md={4}>
                <InputGroup size="sm">
                    <Button variant="outline-secondary" onClick={handleDecrement}>
                        <i className='fa-solid fa-minus' />
                    </Button>
                    <Form.Control
                        value={quantity} // Use quantity state for value
                        onChange={handleChange} // Update quantity state when input changes
                        className='text-center'
                        aria-label="Quantity"
                        aria-describedby="basic-addon1"
                    />
                    <Button variant="outline-secondary" onClick={handleIncrement}>
                        <i className='fa-solid fa-plus' />
                    </Button>
                </InputGroup>
                <h2 className='h6 mt-2 text-end text-muted'>{formatCurrency(item.price)}</h2>
            </Col>
        </Row>
    )
}
