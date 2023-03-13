import axios from 'axios';

export const joinerRequest = async(projectAdmin,projectId,jionerId)=>{
var data = JSON.stringify({
    "projectAdmin": projectAdmin,
    "projectId": projectId,
    "jionerId": jionerId
  });
  
  var config = {
    method: 'post',
  maxBodyLength: Infinity,
    url: 'http://localhost:5000/api/joinProject/joiner',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        return error.response.data.error;
    }
  
}