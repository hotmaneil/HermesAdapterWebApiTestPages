import axios from 'axios'
import { useMessage } from 'naive-ui'

/**
 * 全域變數-URL
 */
const url = window.config.webApi_URL

const service = axios.create({
  baseURL: url,
  timeout: 13000
})

const message = useMessage()

// request interceptor
service.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin'] = url
    config.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, OPTIONS'
    return config
  },
  (error) => {
    // do something with request error
    console.log('request interceptor error', error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    console.log('response interceptor', response)
    return response
  },
  (error) => {
    console.log('response interceptor error', error)
    const error_code = error.code
    switch (error_code) {
      default:
        console.log('response interceptor error debug:' + error) // for debug
        // message.error('error' + error)
        break
    }

    // closeLoading()
    return Promise.reject(error)
  }
)

export default service
