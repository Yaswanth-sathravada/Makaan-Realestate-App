import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer container-fluid">
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-md-2 mb-4">
                        <h5 style={{ textDecoration: 'underline' }}>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="links">Home</Link></li>
                            <li><Link to="/about" className="links">About Us</Link></li>
                            <li><Link to="/contact" className="links">Contact Us</Link></li>
                            <li><Link to="/FAQ" className="links">FAQ</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-2 mb-4">
                        <h5 style={{ textDecoration: 'underline' }}>Categories</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/apartment" className="links">Apartment</Link></li>
                            <li><Link to="/villa" className="links">Villa</Link></li>
                            <li><Link to="/house" className="links">House</Link></li>
                            <li><Link to="/office" className="links"> Office</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-2 mb-4">
                        <h5 style={{ textDecoration: 'underline' }}>Legal</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/privacypolicy" className="links">Privacy Policy</Link></li>
                            <li><Link to="/termsandconditions" className="links">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 style={{ textDecoration: 'underline' }}>Mail Us:</h5>
                        <p>customerservice@makaan.com</p>
                        <div className="icon-container">
                            <i className="fa fa-whatsapp icon" style={{ fontSize: '24px' }}></i>
                            <i className="fa fa-instagram icon" style={{ fontSize: '24px' }}></i>
                            <i className="fa fa-twitter-square icon" style={{ fontSize: '24px' }}></i>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h5 style={{ textDecoration: 'underline' }}>Registered Address</h5>
                        <p>
                            Hyderabad: Plot No : 7-63, New No.11-6-2028, Phase II, S.V.Co-operative Industrial Estate, Kukatpally. RR Dist. Secunderabad : 500037
                            Tel: 1860-123-1000
                        </p>
                    </div>
                    <div className="col-12">
                        <hr className="footer-hr"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="footer-text">© {new Date().getFullYear()} Makaan. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
