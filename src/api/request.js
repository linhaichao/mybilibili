import axios from "axios";
const request = axios.create({
    baseURL: 'https://video.hardews.cn',
    timeout:5000,
    
  })
  export default request