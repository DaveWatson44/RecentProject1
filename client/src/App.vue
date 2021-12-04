<template>
  <div class="app">
    <nav-bar class="navBar" @showSideMenu="toggleShowSideMenu"></nav-bar>
    <side-menu
      class="sideMenu__container"
      :branches="branches"
      @showSideMenuEmitted="toggleShowSideMenu"
    ></side-menu>
    <router-view class="routerView__container" />
    <footer class="footer__container"></footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideMenu from "@/components/SideMenu.vue";
import branches from "@/data/branches.js";
import { mapGetters } from "vuex";
import Store from "@/store/index";

export default {
  components: { NavBar, SideMenu },

  created() {
    let roles = Store.getters.getRoles;
    let userID = Store.getters.getUserID;
    const isAuth = Store.getters.isAuthenticated;

    if(!userID & isAuth){
      this.getUserId()
    }

    if (!roles.length) {
      Store.dispatch("commitRoles");
    }
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["getRoles"]),

    branches() {
      let items = [];
      for (let branch of branches) {
        let branchToAdd = this.checkRole(branch);
        if (branchToAdd.length) {
          items.push(branchToAdd[0]);
        }
      }
      return items;
    },
  },

  methods: {
    checkRole(branch) {
      let items = [];
      let branchRoles = branch.roles;
      this.getRoles.forEach((role) => {
        if (branchRoles.includes(role)) {
          items.push(branch);
        }
      });
      return items;
    },

    getUserId(){
      this.$axios.get('/get_user_id')
    },

    toggleShowSideMenu(showSideMenu) {
      const sideMenuContainer = document.getElementsByClassName(
        "sideMenu__container"
      )[0];

      const routerView = document.getElementsByClassName(
        "routerView__container"
      )[0];

      if (showSideMenu) {
        sideMenuContainer.style.width = "0%";
        sideMenuContainer.style.border = "none";
        routerView.style.width = "100%";
        routerView.style.marginLeft = "0";
      } else {
        sideMenuContainer.style.width = "20%";
        routerView.style.width = "80%";
        routerView.style.marginLeft = "20%";
        sideMenuContainer.style.border = "3px solid #646466";
      }
    },
  },
};
</script>

<style lang="scss">

body {
  margin: 0;
  background-color: #001a33;
}

.navBar {
  width: 100%;
  z-index: 2;
}

.sideMenu__container {
  width: 0%;
  height: 100%;
  z-index: 3;
  position: fixed;
  top: 0;
  @media screen and (max-width: "500px") {
    visibility: hidden;
  }
}

.routerView__container {
  box-sizing: border-box;
  width: 100%;
  transition-property: margin, width;
  transition-duration: 0.5s;
  height: 100%;
}


.footer__container {
  height: 300px;
  background-color: #646466;
  border-bottom: 30px solid #0079C2;
}
</style>