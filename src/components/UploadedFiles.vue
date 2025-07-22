<template>
  <div>
    <div class="uploaded-files">
      <h1>已上传的影像信息</h1>
      <div class="box">
        <ul>
          <li v-for="file in uploadedFiles" :key="file.id">
            {{ file.originaName }} - {{ formatSize(file.size) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uploadedFiles: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 把字节数转成 KB/MB/GB…
    formatSize(bytes) {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  }
}
</script>

<style scoped>
.uploaded-files {
  background: white;
  border-radius: 20px;
  text-align: center;
}
.box{
    background: green;
    height: 133px;
    border-radius: 20px;
}
.box li{
  background: white;
  color: green;
}

</style>