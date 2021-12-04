<template>
  <div class="mainContainer">
    <div class="ticketForm__container">
      <h1>Please enter your ticket below.</h1>
      <form class="input__container">
        <label for="subject">Subject</label>
        <input id="subject" type="text" class="subject" v-model="subject" />
        <label for="issue">Issue</label>
        <textarea id="issue" type="text" class="issue" v-model="issue" />
      </form>
      <button class="submitButton" @click="submitTicket">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subject: "",
      issue: "",
    };
  },

  methods: {
    submitTicket() {
      this.$axios
        .post("/add_ticket", { subject: this.subject, issue: this.issue })
        .then((resp) => {
          alert(resp.data.message);
        })
        .catch((err) => console.log(err));
      this.clearFields();
    },

    clearFields() {
      this.subject = "";
      this.issue = "";
    },
  },
};
</script>

<style lang='scss' scoped>
.mainContainer {
  padding-top: 5%;
  padding-bottom: 5%;
}

.ticketForm__container {
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 500px) {
    width: 500px;
  }
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
  color: #646466;
  font-size: 1.7em;
  text-align: center;
}

.input__container {
  margin-top: 20px;
  width: 80%;
}

label {
  display: block;
  color: #0079c2;
  margin: 10px 0;
  font-size: 1.2em;
  font-family: Arial, Helvetica, sans-serif;
}

label:nth-of-type(2) {
  margin-top: 20px;
}

.subject {
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  font-size: 1.1em;
  border: 2px solid #646466;
}

textarea {
  resize: none;
  height: 250px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #646466;
  font-size: 1.1em;
  font-family: Arial, Helvetica, sans-serif;
}

.submitButton {
  padding: 8px 5px;
  width: 90px;
  margin-top: 20px;
  border: 2px solid #0079c2;
  background-color: #ffffff;
  color: #0079c2;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;

  &:hover {
    background-color: #0079c2;
    color: #ffffff;
  }
}
</style>