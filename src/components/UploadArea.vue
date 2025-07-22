<script>
import axios from 'axios';

export default {
  emits: ['file-uploaded'],
  setup(_, { emit }) {
    const handleDrop = (event) => {
      const files = event.dataTransfer.files;
      uploadFiles(files);
    };
    const handleFileChange = (event) => {
      const files = event.target.files;
      uploadFiles(files);
    };
    const uploadFiles = (files) => {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        
        axios.post('http://localhost:8081/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(percentCompleted);
          }
        }).then((response) => {
          emit('file-uploaded', response.data);
        }).catch((error) => {
          console.error('Upload error:', error);
        })
      }
    };
  return {
    handleDrop,
    handleFileChange
  };
}
}
</script>


<template>
  <div class="box">
    <div class="Upload-box">
      <div>
        <h1>拖拽上传影像</h1>
        <div 
          @dragover.prevent 
          @drop.prevent="handleDrop" 
          class="dropzone">
          <p>将文件拽到这里</p>
          <p>支持GeoTIFF、PNG、JPG、IMG等</p>
          <input type="file" @change="handleFileChange" multiple>
        </div>
      </div>      
    </div>
    
  </div>
</template>


<style scoped>
.Upload-box {
  background: white;
  border-radius: 20px;

}

.dropzone {
  background: green;
  font-size: 20px;
  font-weight: 500;
  border-radius: 20px;
}
</style>