import React from "react";
import {Route,Routes} from "react-router"
import Home from "./Home";
import Apartment from "../PropertyTypes/Apartment";
import Villa from "../PropertyTypes/Villa";
import House from "../PropertyTypes/House";
import Office from "../PropertyTypes/Office";
import Building from "../PropertyTypes/Building";
import Townhouse from "../PropertyTypes/Townhouse";
import Shop from "../PropertyTypes/Shop";
import Garage from "../PropertyTypes/Garage";
import LoginSignup from "../LoginSignup";
import PropertyPage from "../PropertyTypes/PropertyPage";
import UserProfile from "../UserProfile";
import UpdateProfile from "../UpadateProfile";
import UserWishlist from "../UserWishlist";
import About from "./About";
import SearchPage from "../PropertyTypes/SearchPage";
import Contact from "./Contact";
import FAQ from "./FAQ";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./Termsandconditions";
const Body=()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/apartment" element={<Apartment/>}></Route>
            <Route path="/villa" element={<Villa/>}></Route>
            <Route path="/house" element={<House/>}></Route>
            <Route path="/office" element={<Office/>}></Route>
            <Route path="/building" element={<Building/>}></Route>
            <Route path="/townhouse" element={<Townhouse/>}></Route>
            <Route path="/shop" element={<Shop/>}></Route>
            <Route path="/garage" element={<Garage/>}></Route>
            <Route path="/loginsignup" element={<LoginSignup/>}></Route>
            <Route path="/user/accountsettings" element={<UserProfile/>}></Route>
            <Route path="/update-profile" element={<UpdateProfile/>}></Route>
            <Route path="/product/:pid" element={<PropertyPage/>}></Route>
            <Route path="/wishlist" element={<UserWishlist/>}></Route>
            <Route path="/searchpage" element={<SearchPage/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/FAQ" element={<FAQ/>}></Route>
            <Route path="/privacypolicy" element={<PrivacyPolicy/>}></Route>
            <Route path="/termsandconditions" element={<TermsAndConditions/>}></Route>
        </Routes>
        </>
    )
}
export default Body;