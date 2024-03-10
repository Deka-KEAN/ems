import { Link } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import axios from "axios";
import { useState } from "react";




export function Login(){
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    return (
        <div>
            <p >Registered Successfully</p>
            <h1>Sign In</h1>
            <p >Enter your credentials to access your account</p>
            <form >
                <div >
                    <label>Email</label>
                    <input type="text" onChange={(e)=>{setUserName(e.target.value)}} placeholder="johndoe@example.com"></input>
                </div>
                <div >
                    <label>Password</label>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} ></input>
                </div>
                <div>
                    <button onClick={(e)=>{
                        e.preventDefault();
                            const response=axios.post(`http://localhost:3000/manage/api/signin`,{
                                username:userName,
                                password:password
                            });
                            if(response.data){
                                console.log(response.data.token);
                                localStorage.setItem("response-token",response.data.token);
                            }
                        }}
                        type="submit" >
                        <Link to="/login" element={<Dashboard/>}>
                            Sign In
                        </Link>
                    </button>
                </div>
            </form>
        </div>
    );
}