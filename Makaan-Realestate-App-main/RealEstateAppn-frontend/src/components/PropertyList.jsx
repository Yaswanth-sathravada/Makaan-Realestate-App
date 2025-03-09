import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/properties.json");
        if (!response.ok) {
          throw new Error("Error fetching properties");
        }
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching properties. Please try again.");
        setLoading(false);
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="mb-3">Property Listing</h1>
          <p>
            Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore
            lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum
            vero dolor duo.
          </p>
        </div>
        <div className="row g-4">
          {loading && <p>Loading properties...</p>}
          {error && <p className="text-danger">{error}</p>}
          {properties.map((property) => (
            <div
              className="col-lg-4 col-md-6"
              key={property.id}
            >
              <div className="property-item rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                    <a href={property.link}><img className="img-fluid" src={property.image} alt="not available"/></a>
                  <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                    {property.status}
                  </div>
                  <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                    {property.type}
                  </div>
                </div>
                <div className="p-4 pb-0">
                  <h5 className="text-primary mb-3">₹{property.price}</h5>
                  <a className="d-block h5 mb-2" href={property.link}>
                    {property.title}
                  </a>
                  <p>
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    {property.address}
                  </p>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-ruler-combined text-primary me-2"></i>
                    {property.size} Sqft
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-bed text-primary me-2"></i>
                    {property.bedrooms} Bed
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-bath text-primary me-2"></i>
                    {property.bathrooms} Bath
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
