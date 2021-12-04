<template>
  <div class="maintenance__section">
    <div class="parameters__container">
      <div class="vendorDropdown__container">
        <vendor-list-drop-down
          id="vendorListDropdown"
          @vendorNameEmitted="initVendorName"
        />
      </div>
      <div>
        <drop-down
          :queryTypes="queryTypes"
          :labelTitle="labelTitle"
          id="queryTypeDropdown"
        />
      </div>
    </div>
    <div class="table__container">
      <maintenance-table
        :rows="rows"
        :headers="headers"
        @getDetailsEmitted="getDetails"
      ></maintenance-table>
    </div>
  </div>
</template>

<script>
import DropDown from "../components/Maintenance/DropDown.vue";
import VendorListDropDown from "../components/Maintenance/VendorListDropDown.vue";
import MaintenanceTable from "../components/Maintenance/MaintenanceTable.vue";

export default {
  components: { DropDown, VendorListDropDown, MaintenanceTable },

  mounted() {
    this.getMissingImages();
  },

  data() {
    return {
      labelTitle: "Select a Type",
      queryTypes: ["Image", "Chart"],
      vendorName: this.$route.params.vendor,
      rows: [],
      headers: [],
    };
  },

  watch: {
    vendorName: function () {
      this.getMissingImages();
    },
  },

  methods: {
    getMissingImages() {
      this.$axios
        .get("/missing_images_by_vendor", {
          params: {
            vendorName: this.vendorName,
          },
        })
        .then((resp) => {
          let webPages = resp.data;
          if (webPages.length < 1) {
            return;
            // Add an alert or message that states there are no missing images for this vendor.
          }
          this.rows = webPages.sort((a, b) => a.id - b.id);
          this.headers = Object.keys(resp.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    initVendorName(payload) {
      let vendorName = payload.vendorName;

      this.vendorName = vendorName;
    },
    getDetails(row) {
      this.$router.push(`/maintenance/${this.vendorName}/product/${row.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.table__container {
  background-color: #000d1a;
  width: 80%;
  margin: 100px auto 0 auto;
  padding: 50px 0;
  font-size: 0.8rem;
  border-radius: 10px;
}

.maintenance__section {
  padding-bottom: 100px;
  font-family: Arial, Helvetica, sans-serif;
}

.parameters__container {
  margin-left: 10%;
  display: flex;
  margin-top: 50px;
}

.vendorDropdown__container {
  width: 150px;
}

label {
  color: #0079c2;
}
</style>