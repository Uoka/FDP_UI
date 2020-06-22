import {baseServer} from '@/tools/servers'

export class annexService {

  //上传附件
  static uploadAnnex(fileUploadDTO, fileList) {
    let httpMethod = 'POST'
    let files = []
    for (let i = 0; i < fileList.length; i++) {
      files[i] = fileList[i].raw
    }
    return baseServer.connection(httpMethod, '/annex/upload', fileUploadDTO, files, 'files')
  }


  //上传学生照片
  static uploadStudentImg(fileUploadDTO, fileList) {
    let httpMethod = 'POST'
    let files = []
    for (let i = 0; i < fileList.length; i++) {
      files[i] = fileList[i].raw
    }
    return baseServer.connection(httpMethod, '/annex/uploadStudentImg', fileUploadDTO, files, 'files')
  }

  static delStudentImg(fileName) {
    let httpMethod = 'GET'
    let body = baseServer.getArgs(this.delStudentImg, arguments, httpMethod)
    return baseServer.connection(httpMethod, '/annex/delStudentImg', body)
  }

}
