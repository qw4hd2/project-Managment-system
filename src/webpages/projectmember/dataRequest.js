import axios from 'axios';

export const getUserSearchResults = async (searchTerm) => {
    var data =""
  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/user/search?userName=${searchTerm}`,
    headers: {},
    data: data
  };

  try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const postProjectMemberRequest = async (userId, projectId, requestTo) => {
  var data = JSON.stringify({
    "projectAdmin": userId,
    "projectId": projectId,
    "requestTo": requestTo
  });

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/project/member/${projectId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchProject = async(id)=>{
    var config = {
        method: 'get',
      maxBodyLength: Infinity,
        url: `http://localhost:5000/api/getProject/byAdmin/${id}`,
        headers: { }
      };
      try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const assignTask = async(projectId,projectAdmin,memberId,task)=>{
    var data = JSON.stringify({
        "projectAdmin": projectAdmin,
        "projectId": projectId,
        "memberId": memberId,
        "task": task
      });
      
      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/api/task/member/${projectId}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      try{
        const response = await axios(config)
        return response.data
      }catch(err){
        console.log(err)
      }
}

export const taskAssignToMember = async(projectId,memberId)=>{
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/api/fetch/task?projectId=${projectId}&memberId=${memberId}`,
        headers: {}
      };
      try{
        const response = await axios(config)
        return response.data
      }catch(err){
        console.log(err)
      }
     
}