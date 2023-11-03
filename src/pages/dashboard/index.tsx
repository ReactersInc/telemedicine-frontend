import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";

function Dashboard(){

    const name = useSelector((state: {user: { email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.name)
    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(userLogout())
    }
    return(
        <>
        <div>
            Welcome {name}
            <a href="/" onClick={handleLogout}>Log out</a>
        </div>
        </>
        
    )
}

export default Dashboard