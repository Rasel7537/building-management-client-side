import axios from "axios";

const axiosInstance = axios.create({
  baseURL:`https://building-management-server-side-ashen.vercel.app`
})

const useAxios = () => {
    return axiosInstance
};

export default useAxios;