import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let DeleteProduct = ()=>{
    const prodIdRef = useRef(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        alert("You need to login first");
        navigate("/loginsignup");
        return;
    }

    
    const handleDelete = async(e)=>{
        e.preventDefault();
        
        const pid = prodIdRef.current.value;

       try{
        let response = await axios.delete(`http://localhost:8080/deleteProduct/${pid}`,{
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':"application/json"
            }
        })

        prodIdRef.current.value = '';

        console.log("Product deleted",response.data);
        alert("Product deleted successfully!!");
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
                                <label htmlFor="exampleInputName1" className="form-label">Enter Product Id to Delete</label>
                                <input type="text" className="form-control" id="exampleInputName1" ref={prodIdRef} placeholder="Enter product Id" />
                            </div>
                            <button type="submit" className="btn btn-danger">Delete</button>
                    </form>
               </div>
                </div>
        </>
    )

}
export default DeleteProduct;