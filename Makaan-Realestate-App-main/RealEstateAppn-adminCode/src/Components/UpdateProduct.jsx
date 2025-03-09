import { useEffect, useRef ,useState} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  
  const prodnameRef = useRef(null);
  const priceRef = useRef(null);
  const imageLinkRef = useRef(null);
  const addressRef = useRef(null);
  const bedroomsRef = useRef(null);
  const bathroomsRef = useRef(null);
  const sizeRef = useRef(null);
  const typeRef = useRef(null);
  const sellerIdRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFacing, setSelectedFacing] = useState("");
  const [selectedFurnished, setSelectedFurnished] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [product, setProduct] = useState(null);

  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${pid}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };fetchProductDetails();
  }, [pid]);


  useEffect(()=>{
    if(product){
    prodnameRef.current.value = product.pname;
    priceRef.current.value = product.price;
    imageLinkRef.current.value = product.imageLink;
    addressRef.current.value = product.address;
    bedroomsRef.current.value = product.bedrooms;
    bathroomsRef.current.value = product.bathrooms;
    sizeRef.current.value = product.size;
    typeRef.current.value = product.type;
    sellerIdRef.current.value = product.sellerId;
    setSelectedCategory(product.category);
    setSelectedFacing(product.facing);
    setSelectedFurnished(product.furnished);
    setSelectedStatus(product.status);
    }
  },[product]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const pname= prodnameRef.current.value;
    const price= priceRef.current.value;
    const imageLink= imageLinkRef.current.value;
    const address= addressRef.current.value;
    const bedrooms= bedroomsRef.current.value;
    const bathrooms= bathroomsRef.current.value;
    const size= sizeRef.current.value;
    const type= typeRef.current.value;
    const sellerId= sellerIdRef.current.value;
    const token = localStorage.getItem('token');

    if (!token) {
      alert("You need to login first");
      navigate("/loginsignup");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    console.log('Submitting addition');

    try {
      const res = await axios.put(`http://localhost:8080/updateProduct/${pid}`,{
        pname,
        price,
        imageLink,
        category: selectedCategory,
        address,
        facing: selectedFacing,
        furnished:selectedFurnished,
        status:selectedStatus,
        bedrooms,
        bathrooms,
        size,
        type,
        sellerId
      },{
        headers:headers,
      });

      prodnameRef.current.value = '';
      priceRef.current.value = '';
      imageLinkRef.current.value = '';
      addressRef.current.value = '';
      bedroomsRef.current.value = '';
      bathroomsRef.current.value = '';
      sizeRef.current.value = '';
      sellerIdRef.current.value = '';

      console.log("Product updated successfully:", res.data);
      alert("Update successful!");
      navigate("/body");
    } catch (error) {
      console.error("Update error:", error);
      alert(error);
      alert("Failed to update product");
    }
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleFacingChange = (e) => {
    setSelectedFacing(e.target.value);
  };
  const handleFurnishedChange = (e) => {
    setSelectedFurnished(e.target.value);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  return (
    <div className="row">
      <div className="container mt-5 col-4 px-4 py-3" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
        <form onSubmit={handleUpdate}>
          <h4>Update Product</h4>
          <div className="mb-3">
            <label htmlFor="pname" className="form-label">Product Name</label>
            <input type="text" className="form-control" id="pname" ref={prodnameRef} placeholder="Enter product name" />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" className="form-control" id="price" ref={priceRef} placeholder="Enter price" />
          </div>
          <div className="mb-3">
            <label htmlFor="imageLink" className="form-label">Image Link</label>
            <input type="text" className="form-control" id="imageLink" ref={imageLinkRef} placeholder="Enter image link" />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select className="form-select" id="category" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select category</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Building">Building</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Shop">Shop</option>
              <option value="Garage">Garage</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" ref={addressRef} placeholder="Enter address" />
          </div>
          <div className="mb-3">
            <label htmlFor="facing" className="form-label">Facing</label>
            <select className="form-select" id="facing" value={selectedFacing} onChange={handleFacingChange}>
              <option value="">Select facing</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="furnished" className="form-label">Furnished</label>
            <select className="form-select" id="furnished" value={selectedFurnished} onChange={handleFurnishedChange}>
              <option value="">Select furnished</option>
              <option value="Full furnished">Full furnished</option>
              <option value="Semi furnished">Semi furnished</option>
              <option value="Not furnished">Not furnished</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select className="form-select" id="status" value={selectedStatus} onChange={handleStatusChange}>
              <option value="">Select status</option>
              <option value="For Rent">For Rent</option>
              <option value="For Sale">For Sale</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
            <input type="number" className="form-control" id="bedrooms" ref={bedroomsRef} placeholder="Enter number of bedrooms" />
          </div>
          <div className="mb-3">
            <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
            <input type="number" className="form-control" id="bathrooms" ref={bathroomsRef} placeholder="Enter number of bathrooms" />
          </div>
          <div className="mb-3">
            <label htmlFor="size" className="form-label">Size (sq ft)</label>
            <input type="number" className="form-control" id="size" ref={sizeRef} placeholder="Enter size in square feet" />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Type</label>
            <input type="text" className="form-control" id="type" ref={typeRef} placeholder="Enter type" />
          </div>
          <div className="mb-3">
            <label htmlFor="sellerId" className="form-label">Seller ID</label>
            <input type="text" className="form-control" id="sellerId" ref={sellerIdRef} placeholder="Enter seller ID" />
          </div>
          <button type="submit" className="btn btn-primary">Update Product</button>
          <Link to="/body" className="btn btn-secondary ml-2">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;