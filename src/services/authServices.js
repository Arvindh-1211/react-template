import apiInstance from "./apiService";

const login = async (data) => {
    try {
        const response = await apiInstance.post('/login', data)
        return response.data
    } catch (error) {
        console.error("Error logging in: ", error)
        throw new Error("Error logging in");
    }
}

const register = async (data) => {
    try {
        const response = await apiInstance.post('/register', data)
        return response.data
    } catch (error) {
        console.error("Error registering new user: ", error)
        throw new Error("Error registering new user");
    }
}

const authServices = {
    login,
    register
}

export default authServices