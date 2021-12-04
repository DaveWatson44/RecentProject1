<template>
  <div class="home">
    <h1>Title</h1>
  </div>
</template>

<script>

export default {
  name: "Home",
  data(){
    return{
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
    }
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

.title{
  margin: 50px auto;
}

.chart{
  width: 700px;

}


</style>
