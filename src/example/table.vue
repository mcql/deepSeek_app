<template>
  <section class="app">
    <CustomTable :title="title"  :data="data" :data-render="dataRender" />
  </section>
</template>

<script setup>
import CustomTable from './components/common/table.vue';

const title = {
  columns : [
    { label: '骨折项目(不含软骨)', rowspan: 2 },
    { label: '开放性骨折(注 1)' },
    { label: '闭合性骨折(注 2)'}
  ],
  subColumns : [
    { label: '给付比例' },
    { label: '给付比例', prop: 'position' }
  ]
}
const dataRender = ['name', 'age','position'];
const data = [
  { name: '张三', age: 28, position: '开发工程师', department: '开发部', location: '北京' },
  { name: '李四', age: 32, position: '设计师', department: '设计部', location: '上海' }
]
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>