import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // get the current data
  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  // initial the update
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setName(user.name);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(userId);
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (error) {
        toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        <FaArrowAltCircleLeft /> Go Back
      </Link>
      <FormContainer>
        <h2 className=" border-bottom ">Edit User</h2>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message varient="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Label>isAdmin</Form.Label>
              <Form.Check
                type="checkbox"
                placeholder="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button variant="primary" className="my-2" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
