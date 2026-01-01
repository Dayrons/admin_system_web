import axios from "axios";

const managementApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

managementApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
   (error) => {

     return Promise.reject(error);
  }
);

managementApi.interceptors.response.use(
  (response) => {
  
    return response;
  },
  (error) => {
    console.log("Response error: ", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);

export { managementApi };
