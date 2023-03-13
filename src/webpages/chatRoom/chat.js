import axios from "axios";
export const DeleteGroupChat = async(projectAdmin,projectId)=>{
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/api/chatDetete/projectAdmin/${projectAdmin}/projectId/${projectId}`,
        headers: { }
      };
      
      try {
        const response = await axios(config)
        return response.data
      } catch (err) {
        throw err
      }
}