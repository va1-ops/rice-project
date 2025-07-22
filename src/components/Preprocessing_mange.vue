<template>
  <div>
    <div class="preprocessing">
      <h1>数据预处理</h1>
      <div class="box">
        <div>
          <label>
            <input type="checkbox" v-model="selectedOptions.radiometricCorrection" class="checkbox"/>
            辐射校正
          </label>
          <label>
            <input type="checkbox" v-model="selectedOptions.atmosphericCorrection" class="checkbox"/>
            大气校正
          </label>
        </div>
        <button class="start" @click="startPreprocessing">开始预处理</button>
        <div v-if="processingProgress > 0">
          预处理进度: {{ processingProgress }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  props: {
    uploadedFile: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const selectedOptions = ref({
      radiometricCorrection: false,
      atmosphericCorrection: false
    });
    const processingProgress = ref(0);

    const startPreprocessing = async () => {
      if (!props.uploadedFile) {
        alert('请先上传文件');
        return;
      }

      processingProgress.value = 0;
      const formData = new FormData();
      formData.append('file', props.uploadedFile);

      try {
        const response = await axios.post('http://localhost:8081/preprocess', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            processingProgress.value = Math.round((loaded / total) * 100);
          }
        });
        console.log('Preprocessing response:', response.data);
        processingProgress.value = 100;
        emit('preprocessing-done', { selectedOptions: selectedOptions.value, data: response.data });
      } catch (error) {
        console.error('Error during preprocessing:', error.message);
        processingProgress.value = 0;
        emit('error', error.message);
      }
    };

    return {
      selectedOptions,
      processingProgress,
      startPreprocessing
    };
  }
});
</script>

  <style scoped>

  .preprocessing{
      background: white;
      border-radius: 20px;
      text-align: center;

  }
  .box{
      background: green;
      height: 133px;
      border-radius: 20px;
      font-size: 30px;
  }
  </style>