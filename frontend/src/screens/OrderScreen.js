import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Button,
  Card,
  ListGroup,
  Form,
} from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/orderApiSlice";
import React from "react";
import { toast } from "react-toastify";
import { FaEnvelopeOpen, FaEnvelopeOpenText } from "react-icons/fa";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  console.log(order);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { 
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch(); // to call the above function again
        toast.success("Payment Successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }
  function onError(err) {
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.total,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment succeful");
  }
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item className="my-2">
              <p className="px-2 border-bottom">
                <h6>Location: {order.shippingAddress.location}</h6>
                <h6>Phone Number: {order.shippingAddress.tell}</h6>
              </p>
              {order.isPaid ? (
                <Link
                  className=" bg-success  text-white px-3 py-2 my-1 text-decoration-none shadow-sm rounded-1 "
                  to={`/profile`}
                >
                  View Product
                </Link>
              ) : (
                <p className=" bg-danger-subtle  text-white px-3 py-3 rounded-2 ">
                  No Product Yet
                </p>
              )}
            </ListGroup.Item>
    
            <ListGroup.Item className="my-2">
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message varient="success">Paid on {order.paidAt} </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item className="my-2">
              <h2>Order Items</h2>
              {order.orderItems.map((item, i) => (
                <ListGroup.Item key={i}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      <Link>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>&#x20A6;{order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>&#x20A6;{order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>tax</Col>
                  <Col>&#x20A6;{order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>total </Col>
                  <Col>&#x20A6;{order.total}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        className=" "
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      >
                        {/* Nothing goes in here */}
                      </PayPalButtons>
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
