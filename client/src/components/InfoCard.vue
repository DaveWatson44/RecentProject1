<template>
  <div class="infoContainer">
    <div class="infoContent__container">
      <p class="infoCounter">{{ info.count }}</p>
      <div class="icon__container">
        <font-awesome-icon :icon="['fas', info.icon]" class="icon" />
      </div>
    </div>
    <h1 class="title">{{ info.title }}</h1>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "InfoCard",
};
</script>

<style lang='scss' scoped>
.infoContainer {
  border: 1px solid #646466;
  padding: 15px 0 0 1%;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px -5px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: "700px") {
    justify-content: space-between;
  }
  &:hover {
    .icon{
      color: #0079c2;
    }
  }
}

.infoContent__container {
  display: flex;
}

.title {
  font-size: 1.5em;
  color: #646466;
  margin: 0 0 10px 0;
}

.infoCounter {
  margin: 0;
  font-size: 3em;
  font-weight: bold;
  color: #0079c2;
}

.icon__container {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  @media screen and (min-width: "700px") {
    height: 80px;
    
  }
}

.icon {
  height: 80%;
  width: 80%;
  color: #646466;

  @media screen and (min-width: "700px") {
    height: 70%;
    width: 70%;
  }

  @media screen and (min-width: "1800px") {
    height: 90%;
    width: 90%;
  }
}
</style>