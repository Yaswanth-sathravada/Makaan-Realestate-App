import { useState } from "react";
import { Link } from "react-router-dom";
import GetAllProds from "./GetAllProds";
import UpdateAdmin from "./UpdateAdmin";
import DeleteAdmin from "./DeleteAdmin";
import AddProduct from "./AddProduct";
import AllUsers from "./AllUsers";
import Logout from "./Logout";

const Body = () => {
    const [activeContent, setActiveContent] = useState(null);

    const renderContent = (content) => {
        setActiveContent(content);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-3">
                        <Link to="#" className="links" onClick={() => renderContent("getAll")}>
                        All Products & Updation & Deletion
                        </Link>
                </div>
                <div className="col-3">
                    <Link to="#" className="links" onClick={() => renderContent("addProduct")}>
                        Add Product
                    </Link>
                </div>
                <div className="col-3">
                    <Link to="#" className="links" onClick={() => renderContent("updateAdmin")}>
                        Update Admin
                    </Link>
                </div>
                <div className="col-3">
                    <Link to="#" className="links" onClick={() => renderContent("deleteAdmin")}>
                        Delete Admin
                    </Link>  
                </div>
            </div>
            <div className="row mt-3">
            <div className="col-3">
                    <Link to="#" className="links" onClick={() => renderContent("allUsers")}>
                         All Users
                    </Link> 
                </div>
                <div className="col-3">
                    <Link to="#" className="links" onClick={() => renderContent("logout")}>
                        Log Out
                    </Link> 
                </div>
            </div>
            <div className="mt-4">
                {activeContent === "updateAdmin" && <UpdateAdmin />}
                {activeContent === "deleteAdmin" && <DeleteAdmin />}
                {activeContent === "getAll" && <GetAllProds />}
                {activeContent === "addProduct" && <AddProduct />}
                {activeContent === "allUsers" && <AllUsers />}
                {activeContent === "logout" && <Logout />}
            </div>
        </div>
    );
};

export default Body;
