<template>
    <div>
    <div class="result-area">
    <h1>处理结果</h1>
    <div class="box">
        <div v-if="result">
      <h3>处理完成！</h3>
      <button @click="downloadResult">下载结果</button>
      <button @click="goToExtraction">信息提取</button>
    </div>
    <div v-else>
      <h3>等待处理结果...</h3>
    </div>
    </div>
    
  </div>
    </div>

</template>

<script>
// import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    result: {
      type: Object,
      default: null
    }
  },
  setup() {
    const router = useRouter();

    const downloadResult = () => {
      // 模拟下载逻辑
      const a = document.createElement('a');
      a.href = 'path/to/result/file';
      a.download = 'result.zip';
      a.click();
    };

    const goToExtraction = () => {
      router.push('/extraction');
    };

    return {
      downloadResult,
      goToExtraction
    };
  }
};
</script>

<style scoped>
.result-area {
  background: white;
  border-radius: 20px;
  text-align: center;
}
.box{
    background: green;
    height: 133px;
    border-radius: 20px;
}
</style>