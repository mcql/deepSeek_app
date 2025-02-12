<template>
    <table border="1" cellspacing="0" class="table">
      <thead>
      <tr>
        <!-- 第一层表头 -->
        <th v-for="(col, index) in title.columns" :key="index" :colspan="col.colspan" :rowspan="col.rowspan">
          {{ col.label }}
        </th>
      </tr>
      <tr>
        <!-- 第二层表头 -->
        <th v-for="(col, index) in title.subColumns" :key="index" :colspan="col.colspan" :rowspan="col.rowspan">
          {{ col.label }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(col, colIndex) in dataRender" :key="colIndex">
          {{ row[col] }}
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  name: 'ComplexTable',
  props: {
    title: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    dataRender: {
      type: Array,
      required: true
    }
  }
};
</script>
<style scoped>
.table {
  width: 100%;
  text-align: center;
  line-height: 2;
}
</style>