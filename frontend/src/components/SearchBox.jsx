import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: url } = useParams();
  const [keyword, setKeyword] = useState(url || "");

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            setKeyword("");
            navigate(`/search/${keyword}`);
        } else {
            navigate("/");
        }
    }

  return <Form onSubmit={ submitHandler } className="d-flex">
    <Form.Control type="text" name="q" onChange={(e) => setKeyword(e.target.value)} value={keyword} className="mr-sm-2 ml-sm-5 shadow-sm search px-3 border bg-body-secondary rounded-5 text-black" placeholder="Search Product..."  style={{border:"thin solid rgba(150, 150, 50,0.3)", backgroundColor:"rgba(0,0,0,0.8) !important"}}>
    </Form.Control>
    <Button type="submit" variant="outline-dark" className="px-4 rounded-5 bg-primary d-flex align-items-center gap-2 mx-2 text-white shadow rounded-1" style={{border:"thin solid rgba(150, 150, 50,0.3)"}}>
        Search <FaSearch />
    </Button>
  </Form>;
};

export default SearchBox;
