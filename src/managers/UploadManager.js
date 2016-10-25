import randomId from '../utils/randomId'

const defaultHost = REST_API + "/api/files"
import request from 'superagent'

let singleton = null

export default class UploadManager {
  constructor(){
    this.files = {

    }
    this.maxUploads = 3
    this.currentUploads = 0
    this.queue = []
  }

  static instance(){
    if (!singleton){
      singleton = new UploadManager()
    }
    return singleton
  }

  uploadFile(file){
    console.log("upload", file)
    const id = file.id
    this.files[id] = {
      ...file,
      state: 'uploading'
    }
    const attachement = file.file
    const apikKey = window['AC_API_KEY'] || ''
    return request.post(defaultHost + "?apiKey=" + apikKey)
      .field('id', file.id)
      .field('filename', attachement.name)
      .attach('file', attachement, attachement.name)
      .on('progress', e => {
        const file = {
          ...this.files[id],
          progress: e.percent
        }
        this.files[id] = file
        if (file.callback) file.callback(file)
      })//console.log(e))
      .end((err, res) => {
        console.log("end", res);
        const file = {
          ...this.files[id],
          state: "uploaded",
          progress: 100,
        }
        file.callback(file, res.body)
        delete this.files[id]
        this.currentUploads--
        this.processQueue()
        // cb(null, res.body);
      });
  }

  processQueue(){
    console.log("processQueue", this.queue)
    if (this.currentUploads < this.maxUploads && this.queue.length > 0){
      const nextFile = this.queue.shift()
      this.uploadFile(nextFile)
    }
  }

  queueFile(file){
    console.log("queue", file)
    if (this.currentUploads < this.maxUploads){
      this.currentUploads++
      this.uploadFile(file)
    } else {
      this.queue.push(file)
    }
  }

  addFile(file, callback){
    console.log("addFile", file, callback)
    const fileRef = {
      id: randomId(),
      file,
      serverId: undefined,
      state: 'queued',
      progress: 0,
      callback
    }
    this.files[fileRef.id] = fileRef
    this.queueFile(fileRef)
    return this.files[fileRef.id]
  }

  addFiles(files, callback){
    return files.map(file => this.addFile(file, callback))
  }
}

