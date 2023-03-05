import React,{useState,useEffect} from 'react'
import Header from "../include/header.js";
import axios from "axios";
function Request() {
    const userId = sessionStorage.getItem('user')
    const [getData,setData]=useState('');
    const [getId,setID]=useState();
    async function gettingRequestData(){
        var data = JSON.stringify({
            "requestTo": userId,
          });
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/api/requestData`,
            headers: { 
                'Content-Type': 'application/json'
              },
            data:data
          };
         await axios(config)
        .then(function (response) {
            setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    useEffect(()=>{
        gettingRequestData();
        },[])
       
        const handleAccept=async(id,productId)=>{
            console.log(id+ " "+ productId)
        var config = {
            method: 'post',
          maxBodyLength: Infinity,
            url: `http://localhost:5000/api/add/${productId}`,
            headers: { }
          };
          
          await axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
          var config = {
            method: 'delete',
          maxBodyLength: Infinity,
            url: `http://localhost:5000/api/deleteRequest/${id}`,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  return (
    <div className='container-fluid p-0'>
        <Header/>
        {getData?<>
        {getData.map((info,index)=>(
            <div className='row' key={index}>
            <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='card'>
                    <div className='card-body d-flex justify-content-between'>
                        <div>
                            <h4>{info.projectAdmin.userName}</h4>
                            <p>({info.projectId.projectName})</p>
                        </div>
                        <div>
                            <button className='btn btn-success' onClick={e=>{handleAccept(info._id,info.projectId._id)}}>Accept</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))}
        </>:<></>}
        
    </div>
  )
}

export default Request