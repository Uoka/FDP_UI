import {baseServer} from '@/tools/servers'

export class StudentServer {


  static addStudent(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.addStudent, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/student/addStudent', body)
  }


  static delStudent(uid) {
    let httpMethod = 'GET'
    let body = baseServer.getArgs(this.delStudent, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/student/delStudentById', body)
  }

  static batchDeletion(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.batchDeletion, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/student/batchDeletion', body)
  }



  static updateStudent(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.updateStudent, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/student/updateStudent', body)
  }

  static getStudentListData(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.getStudentListData, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/student/getStudentListData', body)
  }

  static getStudentById(uid) {
    let httpMethod = 'GET'
    let body = baseServer.getArgs(this.getStudentById, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/student/getStudentById', body)
  }


}
