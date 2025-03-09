import axios from "axios";
import { useEffect, useState } from "react";

let AllUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        let fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                let response = await axios.get(`http://localhost:8080/getAllUsers`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="my-3">All Users</h1>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.address}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </>
    )
}
export default AllUsers;
