// 引入axios
import axios from 'axios'
// 引入进度条样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.headers['Content-Type'] = 'application/json'


//创建axios实例
const http = axios.create({
  // 通用请求地址-前缀
  baseURL: 'http://43.139.67.87:9993',
  // 最大请求时间单位ms
  timeout: 5000,
})

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    nprogress.start()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (res) => {
    nprogress.done()
    return res.data
  },
  (error) => {
    console.log(error)
    return Promise.reject(new Error('fail'))
  }
)

export default http
