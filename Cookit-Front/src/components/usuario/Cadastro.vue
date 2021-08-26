<template>
  <div class="container">
    <div class="row py-5 mt-5 align-items-center">
      <!-- Registeration Form -->
      <div class="align-content col-md-7 mt-3">
        <form @submit.prevent="submitForm">
          <div class="row">
            <!-- Usuário -->
            <div class="input-group col-lg-12 mb-4">
              <div class="input-group-prepend">
                <span
                  class="
                    input-group-text
                    bg-white
                    px-4
                    border-md border-right-0
                  "
                >
                  <i class="fa fa-user text-muted"></i>
                </span>
              </div>
              <input
                id="firstName"
                type="text"
                name="username"
                placeholder="Usuário"
                class="form-control bg-white border-left-0 border-md"
                v-model="username"
              />
            </div>
            <!-- Primeiro nome -->
            <div class="input-group col-lg-6 mb-4">
              <div class="input-group-prepend">
                <span
                  class="
                    input-group-text
                    bg-white
                    px-4
                    border-md border-right-0
                  "
                >
                  <i class="fa fa-user text-muted"></i>
                </span>
              </div>
              <input
                id="firstName"
                type="text"
                name="first_name"
                placeholder="Nome"
                class="form-control bg-white border-left-0 border-md"
                v-model="first_name"
              />
            </div>
            
            <!-- Último nome -->
            <div class="input-group col-lg-6 mb-4">
              <div class="input-group-prepend">
                <span
                  class="
                    input-group-text
                    bg-white
                    px-4
                    border-md border-right-0
                  "
                >
                  <i class="fa fa-user text-muted"></i>
                </span>
              </div>
              <input
                id="email"
                type="text"
                name="last_name"
                placeholder="Sobrenome"
                class="form-control bg-white border-left-0 border-md"
                v-model="last_name"
              />
            </div>

            <!-- Endereço de email -->
            <div class="input-group col-lg-12 mb-4">
              <div class="input-group-prepend">
                <span
                  class="
                    input-group-text
                    bg-white
                    px-4
                    border-md border-right-0
                  "
                >
                  <i class="fa fa-envelope text-muted"></i>
                </span>
              </div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                class="form-control bg-white border-left-0 border-md"
                v-model="email"
              />
            </div>

            <!-- Senha -->
            <div class="input-group col-lg-6 mb-4">
              <div class="input-group-prepend">
                <span
                  class="
                    input-group-text
                    bg-white
                    px-4
                    border-md border-right-0
                  "
                >
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

            <!-- Confirmação de senha -->
            <div class="input-group col-lg-6 mb-4">
              <div class="input-group-prepend">
                <span
                  class="
                    input-group-text
                    bg-white
                    px-4
                    border-md border-right-0
                  "
                >
                  <i class="fa fa-lock text-muted"></i>
                </span>
              </div>
              <input
                id="passwordConfirmation"
                type="password"
                name="re_password"
                placeholder="Confirme sua senha"
                class="form-control bg-white border-left-0 border-md"
                v-model="re_password"
              />
            </div>

            <!-- Submit Button -->
              <button type="submit" name="submit_form" class="btn btn-primary mx-auto" style="width: 95%">Criar conta</button>
            <!-- Divider Text -->
            <div
              class="
                form-group
                col-lg-12
                mx-auto
                d-flex
                align-items-center
                my-4
              "
            >
              <div class="border-bottom w-100 ml-5"></div>
              <span class="px-2 small text-muted font-weight-bold text-muted"
                >OU</span
              >
              <div class="border-bottom w-100 mr-5"></div>
            </div>

            <!-- Redirect página de login -->
            <div class="text-center w-100">
              <p class="text-muted font-weight-bold">
                Já tem um login?
                <router-link to="/Login" class="text-primary ml-2">Login</router-link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Cadastro",
    data() {
      return {
          username: "",
          first_name: "",
          last_name: "",
          password: "",
          email: "",
          re_password: "",
          errors: [],
      };
    },
    methods: {
      submitForm() {
          const formData = {
              username: this.username,
              first_name: this.first_name,
              last_name: this.last_name,
              password: this.password,
              email: this.email,
              re_password: this.re_password,
          };
        
          axios
              .post("/api/users/", formData)
              .then((response) => {
                  console.log(response);
                  this.$router.push("/login");
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
        },
    },
};
</script>

<style scoped>
body {
  min-height: 50vh;
}

.form-control:not(select) {
  padding: 1.5rem 0.5rem;
}

select.form-control {
  height: 52px;
  padding-left: 0.5rem;
}

.form-control::placeholder {
  color: #ccc;
  font-weight: bold;
  font-size: 0.9rem;
}
.form-control:focus {
  box-shadow: none;
}

.align-content{
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>