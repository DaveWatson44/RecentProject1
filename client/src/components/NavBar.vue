<template>
  <div class="nav__container">
    <div class="topBar"></div>
    <nav>
      <img src="/pel_logo.png" alt="" class="logo" @click="$router.push('/')" />
      <div class="mobileMenu">
        <font-awesome-icon
          :icon="['fas', 'bars']"
          size="lg"
          @click="showMobileSideMenu"
          
        />
      </div>
      <div class="navBarContent__container" @blur="hideDropDown">
        <p class="userName">Dave</p>
        <div class="chevron__container">
          <font-awesome-icon :icon="['fas', 'chevron-down']" size="sm" />
        </div>
        <div class="dropdown__container">
          <div @click="$router.push('/login')" class="dropdown__element">
            Login
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faBars);
library.add(faChevronDown);

export default {
  data() {
    return {
      showDropDown: false,
    };
  },

  methods: {
    showMobileSideMenu() {
      this.$emit('showSideMenu')
    },

    hideDropDown(){
      const dropDown = document.getElementsByClassName('dropdown__container')[0];
      dropDown.style.display = 'none';
    },
  },
};
</script>

<style lang="scss" scoped>
.topBar {
  height: 35px;
  background-color: #0079c2;
  border-bottom: 8px solid #646466;
}
nav {
  background-color: white;
  border-bottom: 3px solid #646466;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 8px 5%;
  height: 40px;
  font-family: Arial, Helvetica, sans-serif;

  @media screen and (min-width: 500px) {
    justify-content: space-between;
  }
}

.logo {
  height: 100%;
  object-fit: contain;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: "500px") {
    display: none;
  }
}

.navBarContent__container {
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    .dropdown__container{
      display: block;
    }
  }
}


.chevron__container {
  margin-left: 5px;
}

p {
  margin: 0;
}

.dropdown__container {
  border: 1px solid black;
  border-radius: 3%;
  height: 100px;
  width: 150px;
  right: 0;
  top: 70%;
  position: absolute;
  padding: 20px;
  background-color: white;
  display: none;
}

.dropdown__element {
  &:hover {
    color: #0079c2;
  }
}

.mobileMenu {
  display: none;
  position: absolute;

  @media screen and (max-width: "500px") {
    display: block;
    left: 5%;
    top: 55px;
  }
}
</style>