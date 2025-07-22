<script setup>
import { onMounted, ref, nextTick, computed } from 'vue'
import RiceChart from '@/components/RiceChart.vue'

const searchQuery = ref('');
const placeSearch = ref(null); // 重命名为placeSearch避免冲突
const map = ref(null);
const marker = ref(null);
const isLoading = ref(false); // 新增加载状态
const searchError = ref(''); // 新增错误信息

onMounted(async () => {
  await nextTick();
  if (!window.AMap) {
    searchError.value = '高德地图 JS API 尚未加载';
    console.error(searchError.value);
    return;
  }
  
  map.value = new window.AMap.Map('map', {
    center: [118.3, 32],
    zoom: 12
  });

  // 使用Promise封装异步插件加载
  await new Promise((resolve, reject) => {
    window.AMap.plugin(['AMap.PlaceSearch', 'AMap.Marker'], () => {
      placeSearch.value = new window.AMap.PlaceSearch({
        map: map.value,
        panel: 'panel'
      });

      // 初始化标记并设置样式
      marker.value = new window.AMap.Marker({
        visible: false,
        map: map.value,
        position: [118.3, 32],
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png', // 设置自定义图标
        offset: new window.AMap.Pixel(-15, -30) // 设置偏移量
      });
      
      resolve();
    }, reject);
  });
});

// 使用计算属性确保searchQuery有值时才允许搜索
const canSearch = computed(() => !!searchQuery.value.trim());

async function doSearch() {
  if (!canSearch.value) return;
  
  try {
    isLoading.value = true;
    searchError.value = '';
    
    // 确保插件已加载完成
    if (!placeSearch.value || !marker.value) {
      throw new Error('搜索插件尚未初始化完成');
    }
    
    console.log('开始搜索:', searchQuery.value);
    
    // 使用Promise封装回调
    const result = await new Promise((resolve, reject) => {
      placeSearch.value.search(searchQuery.value, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result);
        } else {
          reject(new Error(`搜索失败: ${status}, ${result.info}`));
        }
      });
    });
    
    if (result.poiList.pois.length > 0) {
      const firstPoi = result.poiList.pois[0];
      const location = firstPoi.location;
      
      // 更新地图和标记
      map.value.setCenter([location.lng, location.lat]);
      map.value.setZoom(15);
      
      marker.value.setPosition([location.lng, location.lat]);
      marker.value.setVisible(true);
      
      console.log('地图中心移动到:', location.lng, location.lat);
      console.log('搜索结果:', firstPoi.name, firstPoi.address);
    } else {
      throw new Error('搜索结果为空');
    }
  } catch (error) {
    searchError.value = error.message;
    console.error('搜索错误:', searchError.value);
  } finally {
    isLoading.value = false;
    searchQuery.value = '';
  }
}
</script>

<template>
  <div class="page">
    <!-- 左侧指标 -->
    <aside class="indicators">
      <RiceChart />
    </aside>

    <!-- 右侧地图 -->
    <main class="map-container">
      <div class="search-box">

        <input 
        v-model="searchQuery" 
        class="float-search" 
        type="text"
        @keyup.enter="doSearch" 
        placeholder="搜索地点" 
        />
        <button @click="doSearch">搜索</button>

      </div>
      <div id="map" class="map"></div>
      <div id="panel" class="search-panel"></div>
    </main>
  
  </div>
    <div class="home-card">
    <div class="home-text">主要功能——————————————————————————————————————————</div>
    <div class="card_flex">
      <div class="card">影像查询</div>
      <div class="card">水稻信息提取</div>
      <div class="card">水稻覆盖率统计</div>
      <div class="card">水稻病虫害检测</div>
    </div>

  </div>
  
  
</template>




<style scoped>
.home-text{
  font-weight: 600;
  margin:0 0 0 20px ;
  padding-top: 10px;
  font-size: 20px;
}
.home-card{
  width: 96%;
  /* background: white; */
  height:300px;
  margin:30px 40px 0 45px;
  border-radius: 20px;
  box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
        0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
        0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
  /* background: rgba(46, 125, 221, 0.4); */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card{
  background: #fff;
  margin: 10px 20px 10px 20px;
  /* padding:5px 5px 10px 2px; */
  height: 240px;
  text-align: center;
  align-content: center;
  font-size: 40px;
  width:100%;
  border-radius: 20px;
  justify-content: space-between;
  box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
        0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
        0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card_flex{
  display: flex;
}

.card:hover{
  transform: scale(1.1); /* 放大 10% */
}

/* 页面整体布局 */
.page {
  display: flex;
  height: 100%;
  background: transparent;
;
}

.indicators{
 height: 100%;
 width:35%;
 /* background: #f7f9fc; */
 margin-top: 30px;
 margin-left: 20px;
 flex-direction: column;
 overflow-y: scroll;
 -ms-over-flow-style:none;
 border-radius: 20px;
}

.indicators::-webkit-scrollbar{
  display: none;
}



/* 右侧地图容器 */
.map-container {
  flex: 1;
  position: relative;
  margin: 55px 30px 0px 110px;
  background: rgba(0, 0, 0, 0.126); 
  padding: 0.5% 0.5% 0.5% 0.5%;
  border-radius:20px ;
}

.map {
  width: 100%;
  height: 100%;
  border-radius:20px ;
  box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
        0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
        0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
}

.search-box {
  /* width: 80px; */
  position: absolute;
  top: 3%;
  right: 3%;
  z-index: 9999;
  display: flex;
  gap: 4px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  opacity: 0.8;
}
.search-box:hover{
  transform: scale(1.1); /* 放大 10% */
}

.search-box button {
  padding: 6px 10px;
  border: none;
  background: #007AFF;
  color: #fff;
  border-radius: 0 109px 109px 0;
  justify-content: center;
  cursor: pointer;
}
.float-search{
  width: 260px;
  padding: 6px 10px;
  border: none;
  height: 40px;
  border-radius: 109px 0 0 109px;
  box-shadow: 0 2px 6px rgba(0,0,0,.15);
}

.search-panel {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
}
</style>