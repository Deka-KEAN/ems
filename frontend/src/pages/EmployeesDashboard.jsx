import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export function Card(props){
    return (
        <div>
            From props
        </div>
    );
}


export function EmployeeDashboard(){
    const [data,setData]= useState();
    const navigate=useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("response-token")){
            navigate("/login");
        }
        async function fetching(){
            var response=axios.get(`http://localhost:3000/manage/api/show`,{
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem("response-token")
                    }
                }
            );
            return response;
        }
        const response=fetching();
        if(!response.data){
            navigate("/login");
        }
        setData(response.data);
    },[]);
    return (
        <div>
            Employee Dashboard
            <Card props={data}/>
        </div>
    )
}