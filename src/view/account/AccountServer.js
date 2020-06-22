import {baseServer} from '@/tools/servers'

export class AccountServer {

  static login(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.login, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/account/userLogin', body)
  }

  static logout() {
    let httpMethod = 'GET'
    let body = baseServer.getArgs(this.login, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/account/userLogout', body)
  }

  static studentRegister(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.login, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/account/studentRegister', body)
  }

  static teacherRegister(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.login, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/account/teacherRegister', body)
  }

}
