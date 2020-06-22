import axios from 'axios'
import qs from 'qs'
import router from '@/router/index'

axios.defaults.withCredentials = true

/**
 * 请求类
 */
class BaseApi {
  servers

  /**
   * 初始化servers
   */
  constructor (hot) {
    this.servers = axios.create({
      baseURL: hot,
      timeout: 20000,
      withCredentials: true
    })
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.reject(error || '网络繁忙，请稍候再试！')
    })
    this.servers.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        let msg = ''
        if (error.response) {
          switch (error.response.status) {
            case 400:
              msg = error.response.data.message
              break
            case 500:
              msg = error.response.data.message
              break
            case 590:
              break
            case 401:
              msg = '非法的服务器请求被拒绝'
              router.push('/homepage')
              break
            default:
              msg = '与服务器通讯出错(' + error.response.status + ')'
          }
        } else {
          msg = '与服务器通讯出错（原因未知）'
        }
        alert(msg)
        return Promise.reject(error.response || '与服务器通讯出错，请稍候再试！')
      }
    )
  }

  /**
   * get
   * @param method http方法
   * @param url 地址
   * @param body
   * @param fileList
   * @param fileKey
   * @param getObj
   * @returns {Promise<any>}
   */
  connection (method = 'GET', url, body, fileList, fileKey = 'files', getObj) {
    this.getStatusToken()
    if (typeof body !== 'object') {
      body = {}
    }
    method = method.toLocaleLowerCase()
    if (fileList && (fileList instanceof Array)) {
      let headers = {'Content-Type': 'multipart/form-data'}
      let param = new window.FormData()
      for (const key in body) {
        if ({}.hasOwnProperty.call(body, key)) param.append(key, body[key])
      }
      fileList.forEach(file => param.append(fileKey, file))
      return Promise.resolve(this.servers[method](url, param, {headers}))
    }
    if (getObj) {
      if (method === 'get') {
        url = url + (url.indexOf('?') > 0 ? '&' : '?' + qs.stringify(body))
        body = {}
      }
    } else {
      if (!body.params) {
        body = {params: {}, data: body}
      }
      url = url + ((url.indexOf('?') > 0 ? '&' : '?') + qs.stringify(body.params))
    }
    return Promise.resolve(this.servers[method](url, body.data))
  }

  /**
   * 获取body
   * @param func
   * @param values
   * @param method
   * @returns {{data: {}, params: {}}}
   */
  getArgs (func, values, method = 'GET') {
    if (arguments.length === 0) {
      return {params: {}, data: {}}
    }
    method = method.toLocaleLowerCase()
    // 先用正则匹配,取得符合参数模式的字符串.
    // 第一个分组是这个: ([^)]*) 非右括号的任意字符
    let args = func.toString().match(/function.*?\(([^)]*)\)/)[1]
    // 用逗号来分隔参数(arguments string).
    let args1 = args.split(',').map(arg =>
      // 去除注释(inline comments)以及空格
      arg.replace(/\/\*.*\*\//, '').trim()
    ).filter(arg =>
      // 确保没有 undefined.
      arg
    )
    let argsWrapped = {}
    argsWrapped.params = {}
    argsWrapped.data = {}
    let argsLength = Math.min(values.length, args1.length)
    if (method === 'get') {
      for (let i = 0; i < argsLength; i++) {
        argsWrapped.params[args1[i]] = values[i]
      }
    } else if (method === 'post') {
      for (let i = 0; i < argsLength - 1; i++) {
        argsWrapped.params[args1[i]] = values[i]
      }
      argsWrapped.data = values[argsLength - 1]
    }
    return argsWrapped
  }

  /**
   * 设置token
   * @param isLogin
   * @param token
   */
  setToken ({isLogin, token}) {
    // if (isLogin) {
    //   this.servers.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }
  }

  /**
   * 获取登录状态，token值
   * @returns {{isLogin: string, token: string}}
   */
  getStatusToken () {
    // const {isLogin, token} = store.getters;
    // this.setToken({isLogin, token})
  }
}

export const baseServer = new BaseApi(process.env.BASE_API)
