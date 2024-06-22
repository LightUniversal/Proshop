import { useEffect, useState } from "react";
import { setCredentials } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaCheck, FaCheckCircle, FaGoodreads, FaTimes, FaUserPlus } from "react-icons/fa";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useProfileMutation } from "../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userinfo } = useSelector((state) => state.auth);
  const [profile, {isLoading:loadingUpdateProfile, error}] = useProfileMutation();

  const {data:orders, isLoading, isError} = useGetMyOrdersQuery();
  console.log(userinfo._id)
  useEffect(() => {
    if (userinfo) {
      setName(userinfo.name);
      setEmail(userinfo.email);
    }
  }, [userinfo, userinfo.name, userinfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if(password === confirmPassword) {
      try {
        const res = await profile({_id: userinfo._id, name, email, password}).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile Updated");
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    } else {
      toast.error("Password do not match")
    }
    
    

  };
  return (
    <Row>
      <Col md={3}>
        <h2>
          User Profile <FaUserPlus />
        </h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>
                Name
            </Form.Label>
            <Form.Control type="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter name" className="py-3">
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>
                email
            </Form.Label>
            <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" className="py-3">
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>
                Password
            </Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password" className="py-3">
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmpassword" className="my-2">
            <Form.Label>
              Confirm Password
            </Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} placeholder="Confirm password" className="py-3">
            </Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          { loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2 className=" border-bottom mt-3">
          Products
        </h2>
        {isLoading ? <Loader /> : isError ? (
          <Message varient="danger">
              {isError?.data?.message || isError.message}
          </Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>
                 Product ID
                </th>
                <th>
                  Date
                </th>
                <th>
                  Total
                </th>
                <th>
                  Paid (&#x20A6;)
                </th>
                <th>
                  Delivered
                </th>
                
              </tr>
            </thead>
            <tbody>
              {orders.map((order)=> (
                <tr key={order._id}>
                  <td>
                    {order._id}
                  </td>
                  <td>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td>
                    {order.total}
                  </td>
                  <td>
                    {order.isPaid ? (order.paidAt.substring(0, 10)) : (<FaTimes className="text-danger" />)}
                  </td>
                  <td>
                    {order.isPaid &&  (<FaCheck className="text-primary" />)}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}/${order.user}`}>
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
  );
};

export default ProfileScreen;
