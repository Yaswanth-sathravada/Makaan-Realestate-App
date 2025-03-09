import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      let response;
      if (keyword && !category && !address && !price) {
        response = await axios.get(`http://localhost:8080/prodName/${keyword}`);
      } else if (!keyword && category && !address && !price) {
        response = await axios.get(`http://localhost:8080/category/${category}`);
      } else if (!keyword && !category && address && !price) {
        response = await axios.get(`http://localhost:8080/products/${address}`);
      } else if (!keyword && !category && !address && price) {
        response = await axios.get(`http://localhost:8080/price/${price}`);
      } else if (address && category && price) {
        response = await axios.get(`http://localhost:8080/prods/${address}/${category}/${price}`);
      } else if (address && category && !price) {
        response = await axios.get(`http://localhost:8080/prods/address-category/${address}/${category}`);
      }else if (address && !category && price) {
        response = await axios.get(`http://localhost:8080/prods/address-price/${address}/${price}`);
      }else if (!address && category && price) {
        response = await axios.get(`http://localhost:8080/prods/category-price/${category}/${price}`);
      }else {
        console.error("Invalid search criteria");
        return;
      }

      navigate('/searchpage', { state: { results: response.data } });
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  return (
    <div className="container-fluid bg-primary mb-5" style={{ padding: '35px' }}>
      <div className="container">
        <div className="row g-2">
          <div className="col-md-10">
            <div className="row g-2">
              <div className="col-md-4">
                <select className="form-select border-0 py-3" value={address} onChange={(e) => setAddress(e.target.value)}>
                  <option value="">Select Location</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="visakhapatnam">Visakhapatnam</option>
                  <option value="vijayawada">Vijayawada</option>
                  <option value="warangal">Warangal</option>
                  <option value="karimnagar">Karimnagar</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                </select>
              </div>
              <div className="col-md-4">
                <select className="form-select border-0 py-3" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">House</option>
                  <option value="office">Office</option>
                  <option value="building">Building</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="shop">Shop</option>
                  <option value="garage">Garage</option>
                </select>
              </div>
              <div className="col-md-4">
                <input type="number" className="form-control border-0 py-3" placeholder="Search Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-dark border-0 w-100 py-3" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
