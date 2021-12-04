<template>
  <div class="sideMenu__container">
    <font-awesome-icon
      :icon="['fas', 'chevron-circle-left']"
      size="lg"
      class="arrow"
      v-if="showSideMenu"
      @click="toggleShowSideMenu"
    />
    <font-awesome-icon
      :icon="['fas', 'chevron-circle-right']"
      size="lg"
      class="arrow"
      v-if="!showSideMenu"
      @click="toggleShowSideMenu"
    />
    <div class="sideMenu__content">
      <div class="sideMenuUserName__container">
        <h4 class="sideMenu__userName">David Watson - IT</h4>
      </div>
      <div class="sideMenuLinks__container">
        <ul>
          <li
            v-for="(branch, index) in branches"
            :key="index"
            class="sideMenu__title"
          >
            {{ branch.name }}
            <ul v-if="branch.links">
              <li
                v-for="(link, index) in branch.links"
                :key="index"
                class="sideMenu__links"
                @click="$router.push(`/${link.route}`)"
              >
                {{ link.name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";


library.add(faChevronCircleLeft);
library.add(faChevronCircleRight);

export default {
  props: ["branches"],
  data() {
    return {
      showSideMenu: false,
    };
  },

  methods: {
    toggleShowSideMenu() {
      this.$emit("showSideMenuEmitted", this.showSideMenu);
      this.hideMenuContent();
    },

    hideMenuContent() {
      const sideMenuContent = document.getElementsByClassName(
        "sideMenu__content"
      )[0];

      if (this.showSideMenu) {
        sideMenuContent.style.visibility = "hidden";
      } else {
        sideMenuContent.style.visibility = "visible";
      }

      this.showSideMenu = !this.showSideMenu;
    },
  },
};
</script>

<style lang='scss' scoped>
.sideMenu__container {
  font-family: "Open Sans", serif;
  transition-property: width;
  transition-duration: 0.5s;
  z-index: 1;
  background-color: white;
}

.sideMenu__content{
  visibility: hidden;
}

.sideMenuUserName__container {
  height: 50px;
  background-color: #646466;
  display: flex;
  align-items: center;
  padding-left: 10%;
}

.sideMenu__userName {
  color: white;
  margin: 0;
}

.arrow {
  background-color: white;
  position: absolute;
  right: -10px;
  top: 50%;
  z-index: 2;
}

.sideMenuLinks__container {
  width: 100%;
  line-height: 40px;
  height: 90%;
  position: absolute;
  overflow: auto;
  -ms-overflow-style: none;  
  scrollbar-width: none; 
  &::-webkit-scrollbar {
  display: none;
}
}

.sideMenu__title {
  padding-left: 10%;
  font-size: 17px;
  font-weight: bold;
  color: #0079c2;
  &:nth-child(1n+2){
    border-top: 1px solid #646466;
    margin-top: 20px;
    padding-top: 10px;
  }
}

.sideMenu__links {
  font-weight: normal;
  font-size: 14px;
  color: #646466;

  &:hover {
    cursor: pointer;
  }
}

ul {
  padding: 0;
}

li {
  list-style-type: none;
}
</style>