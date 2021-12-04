<template>
  <div>
    <label for="vendorDropdown">Select a Vendor</label>
    <div class="dropdown" id="vendorDropdown">
      <button
        class="dropdown__button"
        @click="showVendorList = !showVendorList"
      >
        Select a Vendor
      </button>
      <div class="dropdownContent__container" v-if="showVendorList">
        <input
          type="text"
          v-model="vendorSearch"
          placeholder="Type to Search"
          class="dropdown__search"
        />
        <div
          v-for="(vendor, index) in vendorList"
          :key="index"
          class="dropdownContent__item"
          @click="getVendorDetails(vendor)"
        >
          {{ vendor }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getVendorList();
  },

  data() {
    return {
      showVendorList: false,
      vendorSearch: "",
      vendors: [],
    };
  },

  computed: {
    vendorList() {
      return this.vendors.filter((vendor) =>
        vendor.toLowerCase().includes(this.vendorSearch.toLowerCase())
      );
    },
  },

  methods: {
    getVendorDetails(vendor) {
      this.showVendorList = !this.showVendorList;
      this.vendorSearch = "";
      this.$emit("vendorNameEmitted", { vendorName: vendor });
    },

    getVendorList() {
      this.$axios
        .get("/vendor_names")
        .then((resp) => {
          this.vendors = resp.data;
        })
        .catch((err) => {
          this.vendors.push("No vendors");
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  margin-top: 10px;
  box-sizing: border-box;
  position: relative;
}

.dropdown__button {
  padding: 5px;
  background-color: #000d1a;
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
  overflow: scroll;
  width: 300px;
  background-color: #ffffff;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.dropdown__search {
  width: 100%;
  box-sizing: border-box;
  height: 35px;
  padding-left: 20px;
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