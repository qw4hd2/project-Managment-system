import axios from "axios";

export const fetchRequestForUser = async (userId) => {
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/api/request/fetch/foruser/${userId}`,
        headers: {}
    };

    const response = await axios(config)
    return response.data
}

export const getRequestResult = async (id) => {
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/api/add/${id}`,
        headers: {}
    };

    try {
        const response = await axios(config)
        return response.data
    } catch (err) {
        throw err
    }
}