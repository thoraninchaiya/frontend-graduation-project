import axios from "axios";

const config = {
    baseURL : "http://localhost:8080"
}

const _axios = axios.create(config)
export default _axios