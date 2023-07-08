import React, { useEffect, useState } from 'react'
import "./styles/Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const navigate=useNavigate()
  const [name,setName]=useState("")

  useEffect(()=>{
    const token=JSON.parse(localStorage.getItem("token"))
    axios.get(`http://localhost:8080/user`,{
      headers: {
        "content-type": "application/json",
        Authorization:token,
      },
  }).then((response)=>{
    setName(response.data.name)
  })
  },[])
  return (
    <div className="navbar-navbar">
    <Link style={{color: 'white',textDecoration: 'none',textAlign: 'center',fontSize:"25px",padding:"10px"}}>Hello {name.length> 0 && name}
    </Link>
    <Link style={{color: 'white',textDecoration: 'none',textAlign: 'center',fontSize:"25px",padding:"10px"}} to="/">Todo App</Link>
    
    <Link style={{color: 'white',textDecoration: 'none',textAlign: 'center',fontSize:"25px",padding:"10px"}} onClick={()=>{localStorage.removeItem('token')
    navigate("/login");
    window.location.reload();}
    
    }>Log out
    </Link>
   </div>
  )  
}

export default Navbar