import { Link, useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { useState } from "react";

import axios from "axios";
export function Register(){
    const navigate=useNavigate();
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    return (
        <div>
            <h1>Register User</h1>
            <p >Enter your information to create an account</p>
            <form >
                <div >
                    <label >User Name</label>
                    <input onChange={(e)=>setUserName(e.target.value)} type="text" placeholder="Doe" ></input>
                </div>
                <div >
                    <label >Email Id</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="johndoe@example.com" ></input>
                </div>
                <div>
                    <label >Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" ></input>
                </div>
                <div>Already have an account click <Link to="/login" element={<Login/>}>here.</Link></div>
                <div>
                    <button onClick={async (e)=>{
                            e.preventDefault();
                            const response= await axios.post(`http://localhost:3000/manage/api/signup`,{
                                username,
                                email,
                                password
                            });
                            
                            console.log(response);
                            localStorage.setItem("response-token",response.data.token);
                            console.log(response.data.token);
                            navigate("/login");
                        }}
                        type="submit" >
                        Register new account
                    </button>
                </div>
            </form>
        </div>
    );
}