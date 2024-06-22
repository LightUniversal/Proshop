import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaAddressBook, FaLock, FaSignInAlt } from "react-icons/fa";

import React from "react";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();
  const {userinfo} = useSelector((state) => state.auth)


  // Check for the redirect search parameter
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  useEffect(()=> {
    if(userinfo) {
      navigate(redirect);
    }
  }, [userinfo, redirect, navigate]);


  const submitHandler = async (e) => {
    e.preventDefault(true);
    try {
      const res = await login({ email, password }).unwrap();
      // The unwrap extracts values 
      dispatch(setCredentials({...res,}));
      navigate(redirect);
      toast.success("Experience the beauty in Cakes...");
    } catch (error){
      toast.error(error?.data?.message || error.error)
    }
  };
  return (
    <div className=" p-4">
    <FormContainer >
      <Form onSubmit={submitHandler} >
      <h3 className='text-black text-center my-3'>
              Login 
          </h3>
        <Form.Group controlId="email" className="my-3">
          <Form.Label className=" text-black">
            Email Address <FaAddressBook className=" text-primary rounded-5 border-1 p-0.5 border-black  " />
          </Form.Label>
          <Form.Control
          style={{ background:"rgba(220,220,225,0.3)"}}
            type="email"
            className="py-3 btn-outline-none border-primary text-black px-4 border-none rounded-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label className="text-black">
            Password <FaLock className=" text-primary  rounded-5 border-1 p-0.5 border-black" />
          </Form.Label>
          <Form.Control
            type="password"
            style={{ background:"rgba(220,220,225,0.3)"}}
            className="py-3 border-1 border-primary text-black rounded-5 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" className=" bg-primary rounded-5  border-1 py-3 px-4 my-3 d-flex align-items-center gap-2 " disabled ={isLoading}>
          Sign in <FaSignInAlt className=' text-white' />
        </Button>

        { isLoading && <Loader />}
      </Form>
      <Row>
        <Col className="text-black d-flex gap-4">
        {/* after the registering, the user is redirected to the value of the redirect variable */}
          New User? <Link to={ redirect ? `/register?redirect=${redirect}` : "/register" } >Register</Link>
        </Col>
      </Row>
    </FormContainer>
  </div>
  );
};

export default LoginScreen;
