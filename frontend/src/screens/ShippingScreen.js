import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckOutSteps from "../components/CheckOutSteps";
import { FaArrowCircleRight } from "react-icons/fa";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //   check if the shippingAddress exits

  const [location, setLocation] = useState(shippingAddress?.location || '');
  const [tell, setTell] = useState(shippingAddress?.tell || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        location,
        tell,
      })
    );
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2/>
      <h1>Details</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Your Location"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="level" className="my-2">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={tell}
            onChange={(e) => setTell(e.target.value)}
            placeholder="Enter Your Phone Number"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="semester" className="my-2">
          
          <Button variant="primary" className="my-2" type="submit">
            Continue <FaArrowCircleRight />
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
