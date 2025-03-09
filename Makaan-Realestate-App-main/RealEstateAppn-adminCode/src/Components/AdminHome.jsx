import { Link} from "react-router-dom";

let AdminHome = ()=>{
    return(
        <>
           <div className="container mt-4">
                <h1 style={{textAlign:'center',color:'blue',fontFamily: 'Consolas'}}>Welcome to Makaan</h1>
                <h3 style={{textAlign:'center',fontFamily: 'Consolas',color:'green'}}>Admin Access</h3>
           </div>
           <div className="container text-center mt-4">
            <div className="col">
            <Link to="/loginsignup" className="links">Login or Register</Link>
            </div>
           </div>
        </>
    )

}
export default AdminHome;