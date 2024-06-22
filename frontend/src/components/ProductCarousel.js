import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopMaterialsQuery } from "../slices/productsApiSlice";
import { FaEdit } from "react-icons/fa";

const ProductCarousel = () => {

  const {data: materials, isLoading, error} = useGetTopMaterialsQuery();

  return isLoading ? <p>Loading...</p> : error ? <Message varient="danger">{error}</Message> : (
    <Carousel pause="hover" className=" bg-dark-subtle carousel   mb-4 " style={{height:"100%"}}>
      {materials.map(material => (
        <Carousel.Item key={material._id}>
          <Link to={`/product/${material._id}`}>
            <Image src={material.image} alt={material.name} width="100%" className="" style={{marginBottom:"100px"}} />
            <Carousel.Caption className=" carousel-caption " style={{background:"rgba(0,0,00.6)"}}>
              <h3 className="px-3 mt-2">
                {material.name} <span className="" style={{color: "green"}}>(&#x20A6;{material.price})</span>
              </h3>
              
            </Carousel.Caption>
            
          </Link>
        </Carousel.Item>
        
        
      ))}
    </Carousel>
  )
    
}

export default ProductCarousel
