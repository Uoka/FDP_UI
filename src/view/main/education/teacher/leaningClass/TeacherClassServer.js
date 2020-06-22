import {baseServer} from '@/tools/servers'

export class TeacherClassServer {

  static addLearningClass(requestDTO) {
    let httpMethod = 'POST'
    let body = baseServer.getArgs(this.addLearningClass, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/learningClass/addLearningClass', body)
  }

  static getAllSimpleClassByUser() {
    let httpMethod = 'GET'
    let body = baseServer.getArgs(this.getAllSimpleClassByUser, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/learningClass/getAllSimpleClassByUser', body)
  }

  static archiveClassById(uid) {
    let httpMethod = 'GET'
    let body = baseServer.getArgs(this.archiveClassById, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/learningClass/archiveClassById', body)
  }
}
