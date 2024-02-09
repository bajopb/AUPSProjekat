import axios  from "axios";

const token=localStorage.getItem('token');

const api = axios.create({
    baseURL: "https://localhost:5001/api",    
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Issuer: 'https://localhost:5001'
    },
});


api.interceptors.request.use((config) => {
    try{
        const token = localStorage.getItem("token");
        if(token){
            return {...config, headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            }};
        }
        return config;
    } catch(e) {
        console.log(e);
        return Promise.reject(e);
    }
});

export default api;