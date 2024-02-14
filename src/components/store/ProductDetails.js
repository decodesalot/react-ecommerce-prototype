import { Col, Button, Modal, Row } from 'react-bootstrap';
import { formatCurrency } from '../../utils';

export const ProductDetails = ({ show, handleClose, selectedProduct, isSelected, addItem }) => {
    const { title, description, price, image, rating: {rate, count} } = selectedProduct;
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

    // Usage
    const stars = renderStars(rate);
  return (
      <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
              
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Col md={4} className='text-center'>
                    <img src={image} alt={title} className='w-75' />
                </Col>
                <Col md={8}>
                      <h2>{title}</h2>
                      <h4>{stars} <Button variant='default' className='btn-link link-underline-light p-0'><span className='fs-6'> ({count} reviews)</span></Button></h4>
                      <h3>{formatCurrency(price)}</h3>
                      {isSelected ?
                          <Button variant="success" className="btn-disabled my-2" disabled>
                              <i className="fa-solid fa-check" /> In Cart
                          </Button>
                          :
                          <Button variant="primary" className='my-2' onClick={() => addItem(selectedProduct)}>
                              <i className="fa-solid fa-plus" /> Add
                          </Button>
                      }
                      <p className='text-muted'>{description}</p>
                      
                </Col>
            </Row>
          </Modal.Body>
      </Modal>
  )
}
