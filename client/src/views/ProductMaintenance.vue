<template>
  <div
    style="padding: 100px 0"
    @drop="uploadFiles"
    @dragenter.prevent="checkDrop"
    @dragover.prevent="checkDrop"
  >
    <div>
      <image-list :images="images"></image-list>

      <div class="description__container">
        <h1>Product Description</h1>
        <textarea class="textArea" name="" id=""></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { pelWebsiteLink } from "@/utilities/staticLinks.js";
import ImageList from "@/components/Maintenance/ImageList.vue";
export default {
  components: { ImageList },
  mounted() {
    this.getImages();
  },
  data() {
    return {
      images: [],
    };
  },

  methods: {
    checkDrop(e) {
      e.preventDefault();
    },

    uploadFiles(e) {
      e.preventDefault();

      let files = e.dataTransfer.files;
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      for (let file of files) {
        formData.append("uploadedImages", file);
      }

      this.sendFiles(formData, config);
    },

    sendFiles(files, config) {
      this.$axios
        .post("/product_images", files, config)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => console.log(err));
    },

    getImage(data) {
      const staticLink = pelWebsiteLink();
      const productID = this.$route.params.id;
      const filename = data.filename;
      return `${staticLink}/${productID}/${filename}`;
    },

    getImages() {
      const productID = this.$route.params.id;

      this.$axios
        .get("/product_images", { params: { productID: productID } })
        .then((resp) => {
          const images = resp.data;

          for (let image of images) {
            let imagePath = this.getImage(image);
            this.images.push(imagePath);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.textArea {
  color: #0079c2;
  border: 1px solid #0079c2;
  background-color: #000d1a;
  width: 100%;
  height: 200px;
}

h1 {
  color: #0079c2;
}

.description__container {
  margin: 0 auto;
  width: 60%;
}
</style>