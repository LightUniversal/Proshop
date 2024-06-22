import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import { useDeleteProductMutation } from "../../slices/productApiSlice";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import { Row, Col, Table, Button } from "react-bootstrap";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});

  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
    
  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted")
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <>
      <Row>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm-m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoadingCreateProduct && <Loader />}
      {deleteLoading && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Product-Name</th>
                <th>Product-Price (&#x20A6;)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>&#x20A6; {product.price}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="light"
                      className="btn-sm text-white "
                      onClick={()=> {deleteProductHandler(product._id)}}
                    >
                      <FaTrash className="text-danger" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
