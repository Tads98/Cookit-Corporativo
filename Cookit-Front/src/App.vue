<template>
  <div>
    <Navbar v-if="$route.name!='LoginCadastro'"/>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/parciais/Navbar";
import axios from 'axios';

export default {
  name: "App",
  beforeCreate() {
      this.$store.commit('initializeStore')
      const token = this.$store.state.auth.token
      if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
      } else {
        axios.defaults.headers.common['Authorization'] = ""
      }
  },
  components: {
    Navbar,
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
  font-family: "Montserrat", sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


i,
svg {
  color: black !important;
  width: 1em;
}
</style>
