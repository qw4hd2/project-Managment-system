import React,{useState,useEffect} from 'react'
import Header from "../include/header.js";
import {fetchRequestForUser,getRequestResult,DeleteRequest} from "./request.js";
import swal from "sweetalert";
function Request() {
    const userId = sessionStorage.getItem('user')
    const [getData,setData]=useState('')
    const [getRequestID , setRequestID]=useState('');
    const getRequestDataForUser = async()=>{
      await fetchRequestForUser(userId).then((response)=>{
        setData(response);
        const requestId = response;
        for(const request of requestId){
          const rid = request._id;
           setRequestID(rid);
        }
      })
    }
    const getRequestIDToDelete=async()=>{
       await DeleteRequest(getRequestID).then((response)=>{
        swal(response,{
          icon:"success",
          buttons:{},
          timer:3000,
        }).then(window.location.reload(true))
       })
    }
    const handleAccept = async(id)=>{
      await getRequestResult(id).then((response)=>{
        swal(
          response, {
          icon: "info",
          buttons: false,
          timer: 3000,
        }
        )
      }).catch((err) => {
        swal(
          err.response.data, {
          icon: "error",
          buttons: false,
          timer: 3000,
        }
        ).then(window.location.reload(true))
      })
    }
    useEffect(()=>{
      getRequestDataForUser();
    },[])
  return (
    <div className='container-fluid p-0'>
        <Header/>
        {getData?<>
        {getData.map((info,index)=>(
            <div  key={index}>
            <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='card bg-dark'>
                    <div className='card-body d-flex justify-content-between'>
                        <div>
                            <h4>{info.projectAdmin.userName}</h4>
                            <p>({info.projectId.projectName})</p>
                        </div>
                        <div>
                            <button className='btn btn-success' onClick={e=>{handleAccept(info._id)}}>Accept</button>
                            <button className='btn btn-danger' onClick={getRequestIDToDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))}
        </>:<>No request here</>}
        
    </div>
  )
}

export default Request