<template>
  <div>
    <nav
      class="navbar navbar-expand-lg d-flex justify-content-between fixed-top"
    >
      <router-link class="navbar-brand" to="/"
        ><img src="@/assets/cookit_logo.svg" alt="Logo" height="36px"
      /></router-link>
      <form
        class="form-inline <!--mr-auto my-2 my-lg-0-->"
        method="GET"
        action=""
      >
        <div id="search" class="input-group">
          <!--TODO: implementar uma forma de limpar sessões neste campo abaixo-->
          <input
            id="search-input"
            v-model="getPesquisa.nome_receita"
            class="form-control"
            type="search"
            placeholder="Busque sua receita"
            aria-label="Busca"
            name="termo"
            value=""
          />
          <button
            id="search-button"
            class="btn btn-success"
            v-on:click.prevent="basicSearch()"
            type="submit"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </form>
      <ul class="nav" v-if="$store.state.auth.isAuthenticated">
        <li class="nav-item dropdown">
          <router-link to="/FormReceita" class="nav-item nav-link">
            <h5><i class="fas fa-book"></i></h5>
          </router-link>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <h5><i class="fas fa-bell"></i></h5>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a id="nav-icon" class="dropdown-item" href="#"
              >Something else here</a
            >
          </div>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <h5><i class="fas fa-heart"></i></h5>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img src="@/assets/cookit_user.svg" alt="" height="25px" />
          </a>

          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <a class="dropdown-item" href="">Perfil</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="">Sair</a>
          </div>
        </li>
        <li>
          <button @click="logout()" class="btn btn-danger">Log out</button>
        </li>
      </ul>

      <div v-else>
        <router-link to="/Login" id="login-button" class="btn btn-primary">
          Login
        </router-link>
        <router-link
          to="/Cadastro"
          id="cadastro-button"
          class="btn btn-secondary"
        >
          Cadastro
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Navbar",
  computed: mapGetters(["getPesquisa"]),

  data() {
    return {
      search_term: "",
    };
  },

  methods: {
    ...mapActions(["basicSearch"]),
    logout() {
      axios
        .post("/api/token/logout/")
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
          this.$store.commit("removeToken");
          this.$router.push("/");
          return response;
        })
        .catch((error) => {
          if (error.response) {
            console.log(JSON.stringify(error.response.data));
          } else if (error.message) {
            console.log(JSON.stringify(error.message));
          } else {
            console.log(JSON.stringify(error));
          }
        });
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #f3efef !important;
  border-bottom: 1px solid #707070;
}

#nav-icon {
  color: black;
  vertical-align: middle;
}

.nav-link {
  padding: 0 1vw 0 1vw;
}

.navbar-brand {
  align-self: center;
  justify-content: center;
  font-size: 0;
}

#nav-icon-span {
  font-size: 12px;
}

#search-input {
  outline: none;
  box-shadow: none !important;
  border-radius: 36px 0 0 36px;
  width: 20vw;
}

#search-button {
  padding: 0 1em 0 1em;
  background-color: white;
  border: 1px solid gray;
  color: gray;
  margin-left: -1px;
  border-radius: 0 36px 36px 0 !important;
}

#search-button i {
  vertical-align: middle;
}

i {
  text-decoration: none !important;
  color: black;
}
</style>
