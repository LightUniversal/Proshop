import {Nav} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser} from "react-icons/fa"

const CheckOutSteps = ({ step1, step2, step3, step4}) => {
  return (
    <Nav className="justify-content-center mb-4 border-bottom bg-black rounded-1  shadow-sm ">
        <Nav.Item>
            {
                step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link>Sign In </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Sign In</Nav.Link>
                )
            }
        </Nav.Item>
        <Nav.Item>
            {
                step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link>Details  </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Details</Nav.Link>
                )
            }
        </Nav.Item>
        <Nav.Item>
            {
                step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link>Payment Process </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Payment Process</Nav.Link>
                )
            }
        </Nav.Item>
        <Nav.Item>
            {
                step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link>Place Order </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )
            }
        </Nav.Item>
    </Nav>
  )
}

export default CheckOutSteps
