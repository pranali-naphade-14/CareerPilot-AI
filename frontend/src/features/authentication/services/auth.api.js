import axios from "axios";

const API_URL = "https://careerpilot-ai-76g9.onrender.com";

export const register = async ({ username, email, password }) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/register`,
            { username, email, password },
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/login`,
            { email, password },
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const logout = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/auth/logout`,
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const getMe = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/auth/get-me`,
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
        console.log(err);
    }
};