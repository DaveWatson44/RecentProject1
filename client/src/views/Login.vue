<template>
  <div class="loginForm__container">
    <form>
      <label for="userName">Username</label>
      <input id="userName" type="text" v-model="userName" />
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" />
      <div class="button__container">
        <button @click.prevent="test">Login</button>
        <button @click.prevent="signUp">Sign up</button>
      </div>
    </form>
  </div>
</template>

<script>
import { login, signup } from "@/utilities/api";

export default {
  data() {
    return {
      userName: "",
      password: "",
    };
  },

  methods: {
    signUp() {
      signup(this.userName, this.password)
        .then((resp) => {
          const token = resp.data;
          this.$store.dispatch("commitToken", { token: token });
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },

    test() {
      login(this.userName, this.password)
        .then((response) => {
          const token = response.data.token;
          const userID = response.data.userID;
          localStorage.setItem('userID', userID);
          this.$store.dispatch("commitToken", { token: token });
          this.$store.dispatch("commitUserID", { userID: userID });
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.loginForm__container {
  border: 1px solid green;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  width: 300px;
  display: flex;
  flex-direction: column;
}

input {
  height: 30px;
  margin-top: 5px;
}

label:nth-of-type(1n + 2) {
  margin-top: 25px;
}

label {
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  color: #0079c2;
}

.button__container {
  display: flex;
  justify-content: center;
}

button {
  margin: 25px 10px 0 10px;
  padding: 7px 15px;
  background-color: #0079c2;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 4px;

  &:hover {
    background-color: #ffffff;
    border: 1px solid #0079c2;
    color: #0079c2;
  }

  &:active {
    background-color: #0079c2;
    border: 1px solid #ffffff;
    color: #ffffff;
  }
}
</style>