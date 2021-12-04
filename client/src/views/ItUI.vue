<template>
  <div class="itUI__container">
    <div class="tiles__container">
      <info-card
        class="infoCard"
        :info="info"
        v-for="(info, index) in information"
        :key="index"
      ></info-card>
    </div>

    <ticket-manager></ticket-manager>
  </div>
</template>

<script>
import InfoCard from "@/components/InfoCard.vue";
import TicketManager from "@/components/IT/TicketManager.vue"

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faArrowDown,
  faDesktop,
  faScroll,
  faTools,
  faNetworkWired,
  faServer,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowUp);
library.add(faArrowDown);
library.add(faDesktop);
library.add(faScroll);
library.add(faTools);
library.add(faNetworkWired);
library.add(faServer);
library.add(faTicketAlt);

export default {
  components: { InfoCard, TicketManager },

  
  data() {
    return {
      information: [
        { title: "Workstations", count: 34, icon: "desktop" },
        { title: "Servers", count: 8, icon: "server" },
        { title: "Equipment", count: 17, icon: "tools" },
        { title: "Tickets", count: 22, icon: "ticket-alt" },
        { title: "Services", count: 9, icon: "network-wired" },
        { title: "Documents", count: 225, icon: "scroll" },
      ],

      
      
    };
  },

  
};
</script>

<style lang="scss" scoped>

.tiles__container {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 91.5%;
  margin-top: 50px;
  flex-wrap: wrap;

  @media screen and (min-width: "700px") {
    flex-direction: row;
    justify-content: space-around;
  }

  @media screen and (min-width: "1100px") {
    justify-content: start;
    flex-wrap: nowrap;
  }
}

.infoCard {
  margin: 20px 15px;
  width: 30%;
  height: 100px;
  font-size: 0.7rem;


  @media screen and (min-width: "700px") {
    font-size: 1rem;
    height: 150px;
    width: 25%;
  }
  @media screen and (min-width: "1100px") {
    width: 20%;
  }

  @media screen and (min-width: "1800px") {
    width: 14%;
    height: 200px;
  }
}


</style>