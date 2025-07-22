import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', {
  state: () => ({
    files: [] // 存储已上传文件信息：{id, name, type, uploadTime, size}
  }),
  actions: {
    setFiles(newFiles) { this.files = newFiles },
    addFile(file) { this.files.push(file) },
    removeFile(fileId) { this.files = this.files.filter(f => f.id !== fileId) }
  }
})