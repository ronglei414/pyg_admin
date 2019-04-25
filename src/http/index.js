// 导入axios
import axios from 'axios'
// 进行baseURL 配置
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// 全局配置拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

//  拦截失效的时候
axios.interceptors.response.use(res => {
  // 判断 token 是否失效
  if (res.data.meta.status === 401) {
    location.href = '#/login'
  } else {
    return res
  }
})
// 导出 axios
export default axios
