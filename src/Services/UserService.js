import axios from 'axios';

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signUpUser = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDetailUser = async (id, accessToken) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
            headers: {
                authorization: accessToken,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/refresh-token`,
            {},
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
