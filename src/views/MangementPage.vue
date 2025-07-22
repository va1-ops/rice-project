<template>
  <div id="app">
    <UploadArea @file-uploaded="handleFileUploaded" @error="handleError" class="card" />
    <UploadedFiles :uploadedFiles="uploadedFiles" class="card"/>
    <Preprocessing :uploadedFile="uploadedFiles[0]" @preprocessing-done="handlePreprocessingDone" @error="handleError" class="card"/>
    <ResultArea :result="result" class="card"/>
  </div>
</template>
<script>
import { ref } from 'vue';
import UploadArea from '../components/UploadArea.vue';
import UploadedFiles from '../components/UploadedFiles.vue';
import Preprocessing from '../components/Preprocessing_mange.vue';
import ResultArea from '../components/ResultArea.vue';

export default {
  components: {
    UploadArea,
    UploadedFiles,
    Preprocessing,
    ResultArea
  },
  setup() {
    const uploadedFiles = ref([]);
    const result = ref(null);
    const error = ref('');

    const handleFileUploaded = (fileInfo) => {
      uploadedFiles.value.push(fileInfo);
    };

    const handlePreprocessingDone = (processingResult) => {
      result.value = processingResult;
    };

    const handleError = (errorMessage) => {
      error.value = errorMessage;
    };

    return {
      uploadedFiles,
      result,
      error,
      handleFileUploaded,
      handlePreprocessingDone,
      handleError
    };
  }
};
</script>

<style scoped>
#app {
  width: 100%;
  text-align: center;
  
}
.card{
  border-radius: 20px;
  margin: 50px 200px;
  /* padding-right:285px ; */
  /* background: blue; */
  align-items: center;
  box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
        0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
        0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
  /* background: rgba(46, 125, 221, 0.4); */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover{
    transform: scale(1.1); /* 放大 10% */
   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 添加阴影增强凸出感 */
}
.error-message {
  color: red;
}
</style>