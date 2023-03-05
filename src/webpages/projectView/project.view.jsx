import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Header from "../include/header.js";
function Projectview() {
    const [userData,setUserData]=useState();
    const fetchProject = async()=>{
        var config = {
            method: 'get',
          maxBodyLength: Infinity,
          url: 'http://localhost:5000/api/fetch/fetchAllProduct',
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
    useEffect(()=>{
        fetchProject();
    },[])
  return (
    
   <div className='container-fluid p-0'>
       <Header/>
 
  
         <table className="table table-dark">
         <thead>
             <tr>
                 <th>Project Admin</th>
                 <th>Project Name</th>
                 <th>Project Type</th>
                 <th>initail Date</th>
                 <th>Due Date</th>
             </tr>
         </thead>
         {userData?<tbody>{userData.map((getInfo,index)=>(
      
             <tr key={index}>
                 <td scope="row">{getInfo.projectAdmin.userName}</td>
                 <td>{getInfo.projectName}</td>
                 <td>{getInfo.projectType}</td>
                  <td>{getInfo.initialDate[0].day}/{getInfo.initialDate[0].month}/{getInfo.initialDate[0].year}</td>
                  <td>{getInfo.dueDate[0].day}/{getInfo.dueDate[0].month}/{getInfo.dueDate[0].year}</td>
                  <td><NavLink to={`/Projectmember/${getInfo._id}`} ><button>Join</button></NavLink></td>
             </tr>
           
              ))}
         </tbody>:<></>}
     </table>
     
   </div>

  )
}

export default Projectview