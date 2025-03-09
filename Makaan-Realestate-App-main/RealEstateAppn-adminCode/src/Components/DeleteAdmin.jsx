import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let DeleteAdmin = ()=>{
    const adminIdRef = useRef(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        alert("You need to login first");
        navigate("/loginsignup");
        return;
    }

    
    const handleDelete = async(e)=>{
        e.preventDefault();
        
        const userId = adminIdRef.current.value;

       try{
        let response = await axios.delete(`http://localhost:8080/deleteUser/${userId}`,{
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':"application/json"
            }
        })

        adminIdRef.current.value = '';

        console.log("Admin deleted",response.data);
        alert("Admin deleted successfully!!");
        navigate("/body");

       }catch(error){
        alert(error);
        console.log(error);
       }

    }
    return(
        <>
            <div className="row">
            <div className="container mt-5 col-4 px-4 py-3" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
                    <form onSubmit={handleDelete}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputName1" className="form-label">Enter Admin Id to Delete</label>
                                <input type="text" className="form-control" id="exampleInputName1" ref={adminIdRef} placeholder="Enter admin Id" />
                            </div>
                            <button type="submit" className="btn btn-danger">Delete</button>
                    </form>
               </div>
                </div>
        </>
    )

}
export default DeleteAdmin;