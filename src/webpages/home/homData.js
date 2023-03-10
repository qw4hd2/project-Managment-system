import axios from 'axios';

export const fetchEnrolledProject = async (userId) => {
  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/projects/${userId}`,
    headers: {}
  };

  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const deleteProject = async (projectId) => {
  var config = {
    method: 'Delete',
    maxBodyLength: Infinity,
    url: `http://localhost:5000/api/delete/project/${projectId}`,
    headers: {}
  };

  try {
    const response = await axios(config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}