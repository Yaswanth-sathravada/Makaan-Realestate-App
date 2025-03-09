import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetAllProds = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllProducts');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products. Please try again.');
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (product) => {
    navigate(`/updateProduct/${product.pid}`);
  };

  const handleDelete = async (pid) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/deleteProduct/${pid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Deleted Successfully");
      const response = await axios.get('http://localhost:8080/getAllProducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1 className="my-5">All Category Products</h1>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>PID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Address</th>
            <th>Facing</th>
            <th>Furnished</th>
            <th>Status</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Size (sq ft)</th>
            <th>Type</th>
            <th>Seller ID</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {products.map((product) => (
            <tr key={product.pid}>
              <td>{product.pid}</td>
              <td><img src={product.imageLink} alt={product.pname} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></td>
              <td>{product.pname}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.address}</td>
              <td>{product.facing}</td>
              <td>{product.furnished}</td>
              <td>{product.status}</td>
              <td>{product.bedrooms}</td>
              <td>{product.bathrooms}</td>
              <td>{product.size} sq ft</td>
              <td>{product.type}</td>
              <td>{product.sellerId}</td>
              <td>
                <button onClick={() => handleClick(product)} className="btn btn-success">
                  Update
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(product.pid)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllProds;
