import { useRef, useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let UpdateAdmin = ()=>{

    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token');
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const mobileRef = useRef(null);
    const addressRef = useRef(null);
    const navigate = useNavigate();

    const [selectedRoles, setSelectedRoles] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/user/${userId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            setUser(response.data);
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        };
    
        fetchUserDetails();
      }, [userId]);
    
      useEffect(() => {
        if (user) {
          usernameRef.current.value = user.username;
          emailRef.current.value = user.email;
          mobileRef.current.value = user.mobile;
          addressRef.current.value = user.address;
        }
      }, [user]);



    const handleUpdate = async (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const mobile = mobileRef.current.value;
        const address = addressRef.current.value;
       
        if(!token){
            alert("You need to login first");
            navigate("/loginsignup");
            return;
        }

        const mobileRegex = /^\d{10}$/;

        const usernameregex = /^(?=.*[A-Za-z])[A-Za-z\s]{6,}$/;

        if (!mobileRegex.test(mobile)) {
            alert("Mobile number should contain exactly 10 digits.");
            return;
        }

        if(!usernameregex.test(username)){
            alert("Username must contain atleat 6 alphabetical characters");
            return;
        }

        if(password!=""){
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*[@#$])[A-Za-z\d@$#]{8,}$/;
            if (!passwordRegex.test(password)) {
                alert("Password should contain at least 8 characters with one special character of @, #, or $.");
                return;
            }
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };

        console.log('Submitting updation');

        try {
            const res = await axios.put(`http://localhost:8080/updateUser/${userId}`, {
                username,
                email,
                password,
                mobile,
                address,
                roles: selectedRoles 
            },
                {
                    headers:headers,
                }
        );

            console.log('Updation successful:', res.data);

            usernameRef.current.value = '';
            passwordRef.current.value = '';
            mobileRef.current.value = '';
            addressRef.current.vale = '';
            emailRef.current.value = '';
            setSelectedRoles([]);
           
            alert("Updation succcessful!!")
            navigate("/body")

        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleRoleChange = (e) => {
        const roleName = e.target.value;
    
        if (selectedRoles.includes(roleName)) {
            setSelectedRoles(selectedRoles.filter(role => role !== roleName));
        } else {
            setSelectedRoles([...selectedRoles, roleName]);
        }
    };


    return(
        <>
         <div className="row">
            <div className="container mt-5 col-4 px-4 py-3" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
                <form onSubmit={handleUpdate}>  
                  <h4>Update</h4>
                  <div className="mb-3">
                      <label htmlFor="exampleInputName1" className="form-label">Username</label>
                      <input type="text" className="form-control" id="exampleInputName1" ref={usernameRef} placeholder="Enter username" />
                  </div>                                         
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail2" className="form-label">Email</label>
                      <input type="email" className="form-control" id="exampleInputEmail2" ref={emailRef} placeholder="Enter email" />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword2" ref={passwordRef} placeholder="Enter password" />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="exampleInputMobile" className="form-label">Mobile</label>
                      <input type="text" className="form-control" id="exampleInputMobile" ref={mobileRef} placeholder="Enter mobile number" />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                      <input type="text" className="form-control" id="exampleInputAddress" ref={addressRef} placeholder="Enter address" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roles" className="form-label">Roles</label>
                    <label><input type="checkbox" value="ROLE_ADMIN" checked={selectedRoles.includes("ROLE_ADMIN")} onChange={handleRoleChange} />Admin</label>
                    <label><input type="checkbox" value="ROLE_USER" checked={selectedRoles.includes("ROLE_USER")} onChange={handleRoleChange} />User</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
               </form>
               </div>
                </div>
        </>
    )

}
export default UpdateAdmin;