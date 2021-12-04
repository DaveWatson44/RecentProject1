<template>
  <div>
    <label for="queryTypeDropDown">{{ labelTitle }}</label>
    <div class="dropdown" id="queryTypeDropDown">
      <button
        class="dropdown__button"
        @click="showQueryTypeList = !showQueryTypeList"
      >
        Select Type
      </button>
      <div class="dropdownContent__container" v-if="showQueryTypeList">
        <div
          class="dropdownContent__item"
          v-for="(type, index) in queryTypes"
          :key="index"
        >
          {{ type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["queryTypes", "labelTitle"],
  data() {
    return {
      showQueryTypeList: false,
    };
  },
};
</script>

<style lang='scss' scoped>
.dropdown {
  margin-top: 10px;
  width: 100px;
  box-sizing: border-box;
  position: relative;
}

.dropdown__button {
  padding: 5px;
  background-color: #000D1A;
  border: 1px solid #0079c2;
  color: #0079c2;
  &:hover {
    background-color: #0079c2;
    color: #ffffff;
  }

  &:active {
    color: #ffffff;
    background-color: #005e99;
  }
}

.dropdownContent__container {
  position: absolute;
  background-color: white;
  width: 100%;
}

.dropdownContent__item {
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #0079c2;
    color: #ffffff;
  }
}

label {
  color: #0079c2;
}
</style>