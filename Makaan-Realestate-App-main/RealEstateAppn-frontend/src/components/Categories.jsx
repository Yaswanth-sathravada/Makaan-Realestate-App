import React from 'react';
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className="container-xxl mt-0">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h1 className="mb-3">Property Types</h1>
          <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/apartment"><a className="cat-item d-block bg-light text-center rounded p-3" href="">
                  <div className="rounded p-4">
                    <div className="icon mb-3 mx-3">
                      <img className="img-fluid" src="/assets/icon-apartment.png" alt="Icon" />
                    </div>
                    <h6>Apartment</h6>
                  </div>
                </a>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/villa"><a className="cat-item d-block bg-light text-center rounded p-3" href="">
                  <div className="rounded p-4">
                    <div className="icon mb-3 mx-3">
                      <img className="img-fluid" src="/assets/icon-villa.png" alt="Icon" />
                    </div>
                    <h6>Villa</h6>
                  </div>
                </a>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/house"><a className="cat-item d-block bg-light text-center rounded p-3" href="">
                  <div className="rounded p-4">
                    <div className="icon mb-3 mx-3">
                      <img className="img-fluid" src="/assets/icon-house.png" alt="Icon" />
                    </div>
                    <h6>House</h6>
                  </div>
                </a>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/office"><a className="cat-item d-block bg-light text-center rounded p-3" href="">
                  <div className="rounded p-4">
                    <div className="icon mb-3 mx-3">
                      <img className="img-fluid" src="/assets/icon-housing.png" alt="Icon" />
                    </div>
                    <h6>Office</h6>
                  </div>
                </a>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/building"><a className="cat-item d-block bg-light text-center rounded p-3" href="">
                  <div className="rounded p-4">
                    <div className="icon mb-3 mx-3">
                      <img className="img-fluid" src="/assets/icon-building.png" alt="Icon" />
                    </div>
                    <h6>Building</h6>
                  </div>
                </a>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/townhouse"><a className="cat-item d-block bg-light text-center rounded p-3" href="">
                  <div className="rounded p-4">
                    <div className="icon mb-3 mx-3">
                      <img className="img-fluid" src="/assets/icon-neighborhood.png" alt="Icon" />
                    </div>
                    <h6>Townhouse</h6>
                  </div>
                </a>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/shop"><a className="cat-item d-block bg-light text-center rounded p-3" href="">
                  <div className="rounded p-4">
                    <div className="icon mb-3 mx-3">
                      <img className="img-fluid" src="/assets/icon-condominium.png" alt="Icon" />
                    </div>
                    <h6>Shop</h6>
                  </div>
                </a>
              </Link>
          </div>
          <div className="col-lg-3 col-sm-6 ">
              <Link to="/garage"><a className="cat-item d-block bg-light text-center rounded p-3" href="">
                  <div className="rounded p-4">
                    <div className="icon mb-3 mx-3">
                      <img className="img-fluid" src="/assets/icon-luxury.png" alt="Icon" />
                    </div>
                    <h6>Garage</h6>
                  </div>
                </a>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
