import { useParams } from "react-router-dom";
import { useViewOrderedProductsQuery } from "../slices/orderApiSlice";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { PRODUCTs_URL } from "../constants";

const OrdersScreen = () => {
    const {id: orderId, paidUser: userId} = useParams();


    const { data: order, isLoading, error} = useViewOrderedProductsQuery(orderId);
    console.log(orderId, userId)

  return (
    <Row>
      <Col>
        <h2 className=" border-bottom mt-3 ">
          Questions
        </h2>
        {isLoading ? <Loader /> : error ? (
          <Message varient="danger">
              {error?.data?.message || error.message}
          </Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>
                 COURSE-TITLE
                </th>
                <th>
                  Price-&#x20A6;
                </th>
                <th>
                </th>
                
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((order)=> (
                <tr key={order.product}>
                  <td>
                    {order.name}
                  </td>
                  <td>
                    {order.price}
                  </td>
                  
                  <td>
                    <LinkContainer to={`/exam/${order.product}/${userId}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default OrdersScreen
