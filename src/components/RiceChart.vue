<template>
  <!-- 三个图表容器 -->
  <div class="charts-box">
    <!-- 1. 动态曲线：水稻历年面积 -->
    <div ref="lineRef" class="chart" />

    <!-- 2. 动态饼图：NDVI 分级占比 -->
    <div ref="pieRef" class="chart" />

    <!-- 3. 动态柱形图：病虫灾害面积 -->
    <div ref="barRef" class="chart" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const lineRef = ref(null)
const pieRef  = ref(null)
const barRef  = ref(null)

// ===== 1. 历年水稻面积（曲线） =====
const riceData = [
  { year: 2018, area: 7.2 },
  { year: 2019, area: 8.1 },
  { year: 2020, area: 12.0 },
  { year: 2021, area: 11.5 },
  { year: 2022, area: 13.6 },
  { year: 2023, area: 15.1 }
]

// ===== 2. NDVI 分级占比（饼图） =====
const ndviData = [
  { name: '高值 (>0.8)', value: 42 },
  { name: '中值 (0.5-0.8)', value: 35 },
  { name: '低值 (<0.5)', value: 23 }
]

// ===== 3. 病虫灾害面积（柱形图） =====
const pestData = [
  { name: '稻飞虱', value: 1.2 },
  { name: '稻瘟病', value: 0.8 },
  { name: '纹枯病', value: 0.5 },
  { name: '二化螟', value: 0.4 }
]

// ===== 通用动画参数 =====
const animOpt = {
  animation: true,
  animationDuration: 5000,
  animationEasing: 'cubicOut'
}

onMounted(() => {
  const lineChart = echarts.init(lineRef.value)
  const pieChart  = echarts.init(pieRef.value)
  const barChart  = echarts.init(barRef.value)

  // 1) 曲线
  lineChart.setOption({
    title: { text: '水稻种植面积', left: 'center' },
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, top: 50, bottom: 20 },
    xAxis: { type: 'category', data: riceData.map(d => d.year) },
    yAxis: { type: 'value', name: '万亩' },
    series: [{
      data: riceData.map(() => 0), // 先全 0
      type: 'line',
      smooth: true,
      lineStyle: { color: '#00b96b', width: 3 },
      areaStyle: { color: 'rgba(0,185,107,0.2)' },
      ...animOpt
    }]
  })
  setTimeout(() => {
    lineChart.setOption({
      series: [{ data: riceData.map(d => d.area) }]
    })
  }, 300)

  // 2) 饼图
  pieChart.setOption({
    title: { text: 'NDVI 分级占比', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [{
      type: 'pie',
      radius: '50%',
      data: ndviData.map(d => ({ name: d.name, value: 0 })), // 先全 0
      emphasis: { itemStyle: { shadowBlur: 10 } },
      ...animOpt
    }]
  })
  setTimeout(() => {
    pieChart.setOption({
      series: [{ data: ndviData }]
    })
  }, 300)

  // 3) 柱形图
  barChart.setOption({
    title: { text: '病虫灾害面积', left: 'center' },
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, top: 50, bottom: 20 },
    xAxis: { type: 'category', data: pestData.map(d => d.name) },
    yAxis: { type: 'value', name: '万亩' },
    series: [{
      data: pestData.map(() => 0), // 先全 0
      type: 'bar',
      itemStyle: { color: '#ff7875' },
      ...animOpt
    }]
  })
  setTimeout(() => {
    barChart.setOption({
      series: [{ data: pestData }]
    })
  }, 300)
})
</script>

<style scoped>
.charts-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding:30px 33px 0 30px;
  /* align-content: center; */
  justify-content: center;
}

.chart {
  width: 100%;
  height: 300px;
  border: 1px solid #eee;
  border-radius: 15px;
  box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
        0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
        0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
  /* background: rgba(46, 125, 221, 0.4); */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom:30px ;

}
.chart:hover{
  transform: scale(1.1); /* 放大 10% */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 添加阴影增强凸出感 */
}
</style>