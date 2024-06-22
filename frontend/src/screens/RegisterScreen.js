import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {
  FaAddressBook,
  FaBuilding,
  FaGraduationCap,
  FaImage,
  FaLock,
  FaSchool,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import React from "react";
import Loader from "../components/Loader";
import { useRegisterMutation, useProfileImageMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [imageUrl, setImgUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const [profileImage, { isLoading: loadingProfileImage }] = useProfileImageMutation();
  const { userinfo } = useSelector((state) => state.auth);

  // Check for the redirect search parameter
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  console.log(userinfo, search);
  useEffect(() => {
    if (userinfo) {
      navigate(redirect);
    }
  }, [userinfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault(true);
    // check for password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ email, password, name, imageUrl, faculty, department, friends: [] }).unwrap();
        // The unwrap extracts values
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Welcome to ExamHub...");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  // Profile Image
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await profileImage(formData).unwrap();
      toast.success(res.message);
      setImgUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div>
      <FormContainer>
        <Form onSubmit={submitHandler} className=" p-1 ">
        <Form.Group controlId="name" className="my-3">
            <Form.Label className="text-black">
              Name <FaUserPlus className=" text-primary " />
            </Form.Label>
            <Form.Control
              type="text"
              style={{ background:"rgba(220,220,225,0.3)" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="py-3 btn-outline-none border-primary text-white px-4 border-none rounded-5"
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-3">
            <Form.Label className=" text-black">
              Email Address{" "}
              <FaAddressBook className=" text-primary rounded-5 border-1 p-0.5 border-black  " />
            </Form.Label>
            <Form.Control
              style={{ background:"rgba(220,220,225,0.3)" }}
              type="email"
              className="py-3 btn-outline-none border-primary text-white px-4 border-none rounded-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            ></Form.Control>
          </Form.Group>
         
          
            
          <Form.Group
            controlId="imgurl"
            className="my-1 px-2 py-2 rounded-1"
          >
            <Form.Label className="">
              Profile Image <FaImage className=" text-success " />
            </Form.Label>
            <Form.Control
              type="text"
              value={imageUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              style={{ background:"rgba(220,220,225,0.3)"}}
            className="py-3 border-1 border-primary text-white rounded-5 px-4"
              placeholder="Enter image url"
            ></Form.Control>
            <Form.Control
              type="file"
              label = "Choose file"
              onChange={uploadFileHandler}
              style={{ background:"rgba(220,220,225,0.3)"}}
            className="py-3 mt-2 border-1 border-primary text-black rounded-5 px-4"
            ></Form.Control>
            
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label className="text-black">
              Password <FaLock className=" text-primary  rounded-5 border-1 p-0.5 border-black" />
            </Form.Label>
            <Form.Control
              type="password"
              style={{ background:"rgba(220,220,225,0.3)"}}
            className="py-3 mt-2 border-1 border-primary text-black rounded-5 px-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId="confirmpassword"
            className="my-1 px-2 py-2 rounded-1"
          >
            <Form.Label className="text-black">
              Confirm Password <FaLock className=" text-primary  rounded-5 border-1 p-0.5 border-black" />
            </Form.Label>
            <Form.Control
              style={{ background:"rgba(220,220,225,0.3)"}}
            className="py-3 mt-2 border-1 border-primary text-black rounded-5 px-4"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter password"

            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="success"
            className="my-3 text-white bg-primary rounded-5 px-3 py-2"
            disabled={isLoading}
          >
            Register <FaUserPlus className="" />
          </Button>

          {isLoading && <Loader />}
        </Form>
        <Row>
          <Col>
            {/* after the registering, the user is redirected to the value of the redirect variable */}
            Already have an account?
            <Link className=" mx-2" to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login <FaSignInAlt className=" text-primary" />
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
