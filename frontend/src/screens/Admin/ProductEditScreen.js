import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import {
  useGetProductQuery,
  useCreateQuestionMutation,
} from "../../slices/productApiSlice";
import { FaArrowAltCircleLeft, FaEdit, FaPlusCircle, FaPlusSquare } from "react-icons/fa";

const ProductEditScreen = () => {
  // Get the productId
  const { id: productId } = useParams();

  // Components states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // get the current data
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductQuery(productId);
  // initial the update
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingImage }] =
    useUploadProductImageMutation();

  const [createQuestion, { isLoading: loadingQuestions }] =
    useCreateQuestionMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setImage(product.image);
      setName(product.name);
    }
  }, [product]);
 

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productId,
      name,
      description,
      countInStock,
      image,
      price,
    };
    const res = await updateProduct(updatedProduct);
    console.log(res);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Product updated!");
      navigate("/admin/productlist");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        <FaArrowAltCircleLeft /> Go Back
      </Link>
      <FormContainer>
        <h2 className=" border-bottom ">
          Edit Product
          <FaEdit
            className=" text-primary "
            style={{ position: "relative", top: "-2px", fontSize: "20px" }}
          />
        </h2>
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

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>countInStock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Upload Product Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose file"
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>
            {loadingImage && <Loader />}
            <Form.Group controlId="CourseOutline" className="my-2">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              disabled={loadingQuestions}
              className="my-2"
              type="submit"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
      
    </>
  );
};

export default ProductEditScreen;
