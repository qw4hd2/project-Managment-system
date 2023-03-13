import axios from 'axios';

export const getUserSearchResults = async (searchTerm) => {
  var data = ""
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
    return response.data.message;
  } catch (error) {
    throw error;
  }
};

export const fetchProject = async (id) => {
  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/getProject/byAdmin/${id}`,
    headers: {}
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const assignTask = async (projectId, projectAdmin, memberId, task) => {
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
    data: data
  };

  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const taskAssignToMember = async (projectId, memberId) => {
  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/fetch/task?projectId=${projectId}&memberId=${memberId}`,
    headers: {}
  };
  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const requestTojoinProject = async (adminId, projectId) => {
  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/requesttojoin/${adminId}/${projectId}`,
    headers: {}
  };
  const response = await axios(config)
  return response.data
}

export const getRequestForAdmin = async (id, projectId, jionerId) => {
  var data = JSON.stringify({
    "jionerId": jionerId
  });

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/admin/request/approval/${projectId}/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    return err
  }


}

export const leaveProejctteam = async (userId, projectId) => {
  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/leave/project/${projectId}/bymember/${userId}`,
    headers: {}
  };

  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const submitTaskFunction = async (projectId, projectAdminid, memberId, img, description) => {
  var data = new FormData();
  data.append('image', img);
  data.append('projectId', projectId);
  data.append('projectAdmin', projectAdminid);
  data.append('memberId', memberId);
  data.append('description', description);

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/file/uploadfile/${projectId}/${projectAdminid}/${memberId}`,
    data: data
  };

  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const totalTaskSubmitBySpecificMember = async (memberId, projectId) => {
  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/tasks/count/${memberId}/${projectId}`,
    headers: {}
  };

  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const taskUploadByMemberToProjectAdmin = async (projectId,memberId) => {
  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/projects/${projectId}/members/${memberId}/tasks`,
    headers: {}
  };

  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}