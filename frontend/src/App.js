import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css";
const App = () => {
  return (
    <div className="">
      <Header />
      <main className="py-3" style={{position:"relative", top:"80px"}}>
        <Container>
          <Outlet />  
          {/* Renders the child route's element, if there is one. */}
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
