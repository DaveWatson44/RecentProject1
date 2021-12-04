<template>
  <div>
    <table>
      <tr>
        <th
          v-for="(header, index) in headers"
          :key="index"
          style="text-align: left"
        >
          {{ header }}
        </th>
      </tr>
      <tr
        v-for="(row, index) in rows"
        :key="index"
        @click="emitGetDetails(row)"
      >
        <td v-for="(data, index) in row" :key="index" v-html="data"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["rows", "headers"],
  data() {
    return {};
  },
  methods: {
    emitGetDetails(row) {
      this.$emit("getDetailsEmitted", row);
    },
  },
};
</script>

<style lang='scss' scoped>

table {
  border-collapse: collapse;
  margin: 0 auto 0 auto;
  width: 90%;
  color: #cccccc;
}

td {
  padding: 12px;
}

th {
  padding-left: 8px;
  padding-bottom: 15px;
}

tr:nth-child(even) {
  background-color: #003366;
}
</style>