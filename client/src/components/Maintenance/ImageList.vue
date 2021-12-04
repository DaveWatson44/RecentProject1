<template>
  <div>
    <div class="imageList__container" @drop="test">
      <img v-for="(image, index) in images" :key="index" :src="image" alt="" />
      <div class="addImage__container">+</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"],

  methods: {
    test(e){
      e.preventDefault();
      console.log(e)
      console.log(e.dataTransfer.items)
    }

  }
};
</script>

<style lang="scss" scoped>
.imageList__container {
  margin: 0 auto;
  width: 60%;
  display: flex;
  flex-wrap: wrap;
}

.addImage__container {
  border: 1px solid #0079c2;
  height: 100px;
  width: 100px;
  color: #0079c2;
  margin: 10px;
}

img {
  height: 100px;
  width: 100px;
  object-fit: contain;
  margin: 10px;
}

h1 {
  color: #0079c2;
}
</style>