import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded-2 border-0 '>
      <Link to={`/product/${product._id}`}>
      <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body className=' shadow-sm mt-1 bg-black rounded-3 text-white'>
        <Link to={`/product/${product._id}`} className=' text-white' style={{ textDecoration:"none"}}>
            <Card.Title as="div" className='product-title px-2 py-1  ' style={{backgroundColor:"rgba(10,10,30,0.81)"}}>
                <strong>
                    {product.name}
                </strong>
            </Card.Title>
        </Link>
        <Card.Text as="div" className='px-1 '>
            <Rating value={product.rating} text={product.numReviews + " reviews"}/>
        </Card.Text>

        <Card.Text as='h3' className='px-2 py-1 '>
        &#x20A6;{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
