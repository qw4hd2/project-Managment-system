import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import "./../css/style.css";
import {RiLogoutCircleRLine} from 'react-icons/ri';
export default function App() {
  const [showBasic, setShowBasic] = useState(false);
  const userId = sessionStorage.getItem('user');
  const [userData,setUserData]=useState();
  const fetchProject = async()=>{
      var config = {
          method: 'get',
        maxBodyLength: Infinity,
          url: `http://localhost:5000/api/user/${userId}`,
          headers: { }
        };
        
        axios(config)
        .then(function (response) {
          setUserData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
        
  }
  const logOutHandler =()=>{
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    window.location.href = '/';
  }
  useEffect(()=>{
      fetchProject();
  },[])
  return (
    <header>
     <nav className="navbar navbar-expand-lg navbar-light bg-light gradient-custom-2">
        <a className="navbar-brand" href="#">{userData&&(<>{userData.userName}</>)}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={()=>{setShowBasic(!showBasic)}} >
            <span className="navbar-toggler-icon"></span>
        </button>
         <div className="collapse navbar-collapse justify-content-end" >
            <div className="navbar-nav">
            <NavLink to="/home" className="nav-item nav-link">Home</NavLink>
            <NavLink to="/seeProjects"  className="nav-item nav-link">All Projects</NavLink>
            <NavLink to="/request"  className="nav-item nav-link">Request</NavLink>
            <button onClick={logOutHandler} className='btn btn-danger'><RiLogoutCircleRLine/></button>
         </div>
     </div>
     {showBasic&&(
         <div className=" navbar-collapse" >
            <div className="navbar-nav">
            <NavLink to="/home" className="nav-item nav-link">Home</NavLink>
            <NavLink to="/seeProjects"  className="nav-item nav-link">All Projects</NavLink>
            <NavLink to="/request"  className="nav-item nav-link">Request</NavLink>
            <div onClick={logOutHandler} className='bg-danger text-center'>Log out</div>
         </div>
     </div>)}
       
        </nav>
    </header>
  );
}