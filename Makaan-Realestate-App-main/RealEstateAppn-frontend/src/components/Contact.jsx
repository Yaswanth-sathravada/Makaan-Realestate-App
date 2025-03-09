import React from "react";

const Contact = () => {
  return (
    <div className="container">
      <div className="title">
        <h1 style={{ textAlign: "center" }}>Contact Us</h1>
      </div>
      <div className="content">
        <h2>Head Office Address</h2>
        <span>
          <b>Mumbai</b>: Makaan.com, 7th Floor, Technopolis Knowledge Park, Mahakali Caves Road, Andheri East, Mumbai, Maharashtra 400093
          <br />
          Tel: 1860-123-4567
        </span>
        <br />
        <span>
          <b>Bangalore</b>: Makaan.com, Prestige Meridian Tower, 5th Floor, 30 Mahatma Gandhi Road, Bengaluru, Karnataka 560001
          <br />
          Tel: 1860-123-4568
        </span>
        <br />
        <span>
          <b>Delhi</b>: Makaan.com, Building No. 10, 2nd Floor, DLF Cyber City, Phase II, Gurugram, Haryana 122002
          <br />
          Tel: 1860-123-4569
        </span>
        <br />
        <br />
        <span>Email: contact@makaan.com</span>
      </div>
    </div>
  );
};

export default Contact;
