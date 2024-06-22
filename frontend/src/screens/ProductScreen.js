import { useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  FaArrowCircleLeft,
  FaArrowLeft,
  FaCartPlus,
  FaCommentAlt,
  FaComments,
  FaInfoCircle,
  FaPlus,
  FaPlusCircle,
  FaQuestionCircle,
  FaSignInAlt,
  FaStar,
  FaStreetView,
  FaUserCircle,
} from "react-icons/fa";
import {
  useGetProductQuery,
  useCreateReviewMutation,
} from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../slices/cartSlice.js";
import Meta from "../components/Meta";
const ProductScreen = () => {
  // const [product, setProducts] = useState([]);
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductQuery(productId);

  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const { userinfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate("/cart");
  };
  // useEffect(()=> {
  //   const fetchData = async () => {
  //     const  {data} = await axios.get(`/api/products/${productId}`);
  //     setProducts(data);
  //   }

  //   fetchData();
  // }, [productId]);

  // get id from the url. The useParams returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
  // fetch the product
  // const product = products.find((p) => {
  //   return p._id === productId;
  // });
  // console.log(product)
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success("Review submitted");
      setRating(0);
      setComment("");
    } catch(err) {
      toast.error(err?.data.message || err.message);
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <>
          <Message varient="danger">
            {error?.data.message || error.error}
          </Message>
        </>
      ) : (
        <>
        <Meta title={product.name} />
          <Link to="/" className="btn btn-light my-2  text-white bg-black   py-2 rounded-1">
            <FaArrowCircleLeft /> Back
          </Link>
          <Row>
            <Col md={5} className=" ">
              <Image src={product.image} alt={product.name} fluid className=" rounded-2" />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={product.numReviews + " reviews"}
                  />
                </ListGroup.Item>
                
                <ListGroup.Item className=" fw-medium">
                  <h4 className=" d-inline-block py-2 ">Product-Description :</h4> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className=" rounded-1 border-1 border-opacity-10 shadow-sm" style={{border:"thin solid rgba(200,200,200,0.4)"}}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong className=" text-success px-2 py-1 " style={{backgroundColor:"rgba(203, 240, 227, 0.1)"}}>	&#x20A6;{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                            {/* The keys is used to create arrays of indexes */}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className=" border-0 py-2 bg-black small rounded-1"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                    <FaCartPlus /> Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush" style={{backgroundColor:"rgba(0,0,0,0.1)"}}>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p><FaUserCircle /> {review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write Your Review</h2>
                  {loadingReview && <Loader />}
                  {userinfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label className="">
                          Rating 
                        </Form.Label>
                        <Form.Control className="rounded-0"
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                      controlId="comment"
                      className="my-2"
                    >
                      <Form.Label className="">
                        Comment <FaComments className=" text-black " />
                      </Form.Label>
                      <Form.Control className="rounded-0" as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)}>
                      </Form.Control>
                      <Button type="submit" className=" bg-black border-0 rounded-1 " style={{cursor:"pointer"}}>
                        Comment <FaCommentAlt />
                      </Button>
                    </Form.Group>
                    </Form>
                  ) : (
                    <Message>
                     Please <Link to="/login"> sign in <FaSignInAlt />
                      </Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
