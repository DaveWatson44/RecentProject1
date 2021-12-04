<template>
  <div>
    <div class="openTickets__container">
      <h1 class="title">Open Tickets</h1>
      <div class="openTicketsSection__container">
        <ticket-list class="" :tickets="tickets"></ticket-list>
        <div class="ticketStats__container">
          <div class="ticketStats">
            <h1>Open</h1>
            <p>{{ tickets.length }}</p>
          </div>
          <div class="ticketStats">
            <h1>Increase</h1>
            <p style="color: green">
              67%
              <font-awesome-icon
                :icon="['fas', 'arrow-up']"
                size="sm"
                class="arrow"
              />
            </p>
          </div>
          <div class="ticketStats">
            <h1>Completed</h1>
            <p>14</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketList from "@/components/IT/TicketList.vue";
import { getTickets } from "@/utilities/api.js";

export default {
  components: { TicketList },
  mounted() {
    this.initTickets();
  },
  data() {
    return {
      tickets: [],
    };
  },
  methods: {
    async initTickets() {
      let tickets = await getTickets({ status: "f" });
      this.tickets = tickets.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.openTickets__container {
  border: 1px solid #646466;
  width: 90%;
  margin: 60px auto 0 auto;
  padding: 0 0 50px 0;
  background-color: #f2f2f2;

  .title {
    color: #0079c2;
    padding: 10px 0 0 4.5%;
    margin: 0;
    height: 50px;
    background-color: #262626;
  }

  .openTicketsSection__container {
    display: flex;
    justify-content: space-around;
    padding-top: 30px;
  }
}

.ticketStats__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 10px 0;
  background-color: #f2f2f2;
  width: 15%;
  display: none;
  color: #646466;
  @media screen and (min-width: 1000px) {
    display: block;
  }
}

.ticketStats {
  border: 1px solid black;
  margin: 20px 0;
  height: 200px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;

  h1 {
    font-size: 1.3rem;
    width: 70%;
    text-align: center;
  }

  p {
    margin: 20px 0 0 0;
    font-size: 2rem;

    @media screen and (min-width: 1500px) {
      font-size: 3rem;
    }
  }

  .arrow {
    color: green;
  }
}
</style>