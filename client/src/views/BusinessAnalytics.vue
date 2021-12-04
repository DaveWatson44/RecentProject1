<template>
  <div class="home">
    <div class="sectionOne">
      <div class="totalInformation__container">
        <div class="tileSection__container tileSection__1">
          <div class="tile">Total Revenue</div>
          <div class="tile">Total Orders</div>
        </div>
        <div class="tileSection__container tileSection__2">
          <div class="tile">Increase / Decrease Compared to Last month</div>
          <div class="tile">Total Returns</div>
        </div>
      </div>
      <div class="revenueSources__container">
        <div class="chart__container">
          <chart
            :type="'doughnut'"
            :label="'test'"
            :labels="labels"
            class="chart"
          ></chart>
        </div>
      </div>
      <div class="topCustomers__container"></div>
    </div>
    <div class=""></div>
    <div class=""></div>
  </div>
</template>

<script>
import Chart from "../components/Charts/Chart.vue";

export default {
  components: { Chart },
  name: "test",
  data() {
    return {
      labels: ["Web", "Phone", "Fax"],
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  padding: 50px 5% 0 5%;
}

.sectionOne {
  display: flex;
  .totalInformation__container {
    border: 1px solid red;
    width: 30%;

    .tileSection__container {
      display: flex;
      justify-content: space-between;
    }

    .tileSection__1 {
    }

    .tileSection__2 {
      margin-top: 50px;
    }

    .tile {
      border: 1px solid black;
      height: 150px;
      width: 45%;
    }
  }

  .revenueSources__container {
    border: 1px solid blue;
    width: 60%;
    .chart__container {
      width: 200px;
      height: 100px;
    }
  }

  .topCustomers__container {
    border: 1px solid purple;
    width: 20%;
  }
}
</style>
