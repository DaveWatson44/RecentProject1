<template>

    <div class="ticketTable">
      <div v-if="!tickets">No tickets, hurray!</div>
      <div v-else>
        <div class="ticketHeader__container">
          <p
            class="ticketHeader__field"
            v-for="(field, index) in ticketHeaderFields"
            :key="index"
          >
            {{ field }}
          </p>
        </div>

        <div class="ticket" v-for="(ticket, index) in tickets" :key="index">
          <p class="ticketData">{{ ticket.created_on }}</p>
          <p class="ticketData">{{ ticket.issuer }}</p>
          <p class="ticketData">{{ ticket.subject }}</p>
          <p class="ticketData">{{ ticket.issue }}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ["tickets"],
  data() {
    return {
      ticketHeaderFields: ["Created On", "Issuer", "Subject", "Issue"],
    };
  },
};
</script>

<style lang='scss' scoped>
.ticketTable {
  width: 95%;

  @media screen and (min-width: 1000px) {
    width: 70%;
  }
}

.ticketHeader__container {
  display: flex;

  .ticketHeader__field {
    width: 20%;
    margin-left: 2%;
    font-weight: bold;
  }
}

.ticket {
  display: flex;
  &:nth-child(odd) {
    background-color: #ffffff;
  }
  &:nth-child(even) {
    background-color: #d8d8d9;
  }

  .ticketData {
    margin-left: 2%;
    width: 20%;
    height: 20px;
    overflow: hidden;
  }
}
</style>