import {baseServer} from '@/tools/servers'

export class PermissionServer {


  static addPermission(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.addPermission, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/permission/addPermission', body)
  }

  static getPermissionListData(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.getPermissionListData, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/permission/getPermissionListData', body)
  }

  static getPermissionWithLineById(uid) {
    let httpMethod = 'GET'
    let body = baseServer.getArgs(this.getPermissionWithLineById, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/permission/getPermissionWithLineById', body)
  }

  static getPermissionURLs() {
    let httpMethod = 'GET'
    let body = baseServer.getArgs(this.getPermissionURLs, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/permission/getPermissionURLs', body)
  }


}
