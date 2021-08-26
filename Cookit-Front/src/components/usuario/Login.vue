<template>
  <div class="login container align-content col-md-5">
    <form @submit.prevent="submitForm">
      <!-- Endereço de email -->
      <div class="align-content input-group col-lg-12 mb-4">
        <div class="input-group-prepend">
          <span class="input-group-text bg-white px-4 border-md border-right-0">
            <i class="fa fa-envelope text-muted"></i>
          </span>
        </div>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          class="form-control bg-white border-left-0 border-md"
          v-model="username"
        />
      </div>

      <!-- Senha -->
      <div class="input-group col-lg-12 mb-4">
        <div class="input-group-prepend">
          <span class="input-group-text bg-white px-4 border-md border-right-0">
            <i class="fa fa-lock text-muted"></i>
          </span>
        </div>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Senha"
          class="form-control bg-white border-left-0 border-md"
          v-model="password"
        />
      </div>
      <!--<div class="" v-if="errors.length">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>-->
      <!-- Submit Button -->
      <button
        type="submit"
        name="submit_form"
        class="btn btn-primary"
        style="width: 95%; margin-left: 15px"
      >
        Login
      </button>
      <!-- Divider Text -->
      <div class="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
        <div class="border-bottom w-100 ml-5"></div>
        <span class="px-2 small text-muted font-weight-bold text-muted"
          >OU</span
        >
        <div class="border-bottom w-100 mr-5"></div>
      </div>

      <!-- Redirect página de login -->
      <div class="text-center w-100">
        <p class="text-muted font-weight-bold">
          Ainda não possui cadastro?
          <router-link to="/cadastro" class="text-primary ml-2"
            >Cadastre-se</router-link
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",
  data() {
    return {
      user: "",
      username: "",
      password: "",
      errors: [],
    };
  },

  methods: {
    async reativarConta() {
      axios.get("/api/users/me").then((response) => {
        this.user = response.data;
        console.log(this.user.visivel);

        if (!this.user.visivel) {
          this.user.visivel = true;
          axios.put("/api/users/me/", this.user).catch((error) => {
            console.log(error);
          });
        }
      });
    },

    async submitForm() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");

      const formData = {
        password: this.password,
        email: this.username,
      };

      await axios
        .post("/api/token/login/", formData)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          this.$router.push("/EditarPerfil");
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
            console.log(JSON.stringify(error.response.data));
          } else if (error.message) {
            console.log(JSON.stringify(error.message));
          } else {
            console.log(JSON.stringify(error));
          }
        });
      this.reativarConta();
    },
  },
};
</script>

<style scoped>
.login {
  margin-top: 15%;
}
</style>