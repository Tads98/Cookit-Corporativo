<template>
  <nav id="sidebar">
    <button onclick="Close(sidebar)" class="btn sidebar-close">
      <i class="fas fa-times"></i>
    </button>
    <form method="GET" action="">
      <div id="order-by">
        <div class="form-group">
          <label class="input-group-text input-label-sidebar">Ordenar:</label>
          <select class="form-control custom-select">
            <option>Nome</option>
            <option>Visualizações</option>
            <option>Avaliações</option>
            <option>Mais recente</option>
            <option>Mais antigo</option>
          </select>
        </div>
        <h4 class="stars-sidebar">
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </h4>
      </div>
      <div id="intel">
        <div class="form-group">
          <label class="input-group-text input-label-sidebar">Porções</label>
          <input
            class="form-control"
            id="portions"
            type="number"
            min="1"
            name="porcoes"
          />
        </div>
        <div class="form-group">
          <label class="input-group-text input-label-sidebar"
            >Tmp de prep</label
          >
          <input id="prep-time" type="time" class="form-control" />
        </div>
        <div class="form-group">
          <label class="input-group-text input-label-sidebar"
            >Dificuldade</label
          >
          <select 
            @change="basicSearch"
            v-model="getPesquisa.dificuldade"
            id="difficulty"
            name="dificuldade"
            class="form-control custom-select"
          >
            <option value="">Todas</option>
            <option value="F">Fácil</option>
            <option value="M">Médio</option>
            <option value="D">Difícil</option>
            <option value="C">Super</option>
          </select>
        </div>
        <div class="form-group">
          <h6><b>Sabor:</b></h6>
          <div class="form-check">
            <!--TODO: implementar como receber no backend dois valores ao mesmo tempo-->
            <span>
              <label>
                <input v-model="getPesquisa.sabor_receita" type="checkbox" name="sabor" value="D" @change="basicSearch" />
                <i class="a-icon a-icon-checkbox"></i>
              </label>
              <span>Doce</span>
            </span>
            <br />
            <span>
              <label>
                <input v-model="getPesquisa.sabor_receita" type="checkbox" name="sabor" value="S" @change="basicSearch" />
                <i class="a-icon a-icon-checkbox"></i>
              </label>
              <span>Salgado</span>
            </span>
          </div>
        </div>
      </div>
      <div id="categories" class="form-group">
        <h6><b>Categorias:</b></h6>
        <div class="form-check">
          <input v-model="getPesquisa.categoria" class="form-check-input" type="checkbox" value="C" @change="basicSearch" />
          <label class="form-check-label" for="defaultCheck1">
            Café da manhã
          </label>
        </div>
        <div class="form-check">
          <input v-model="getPesquisa.categoria" class="form-check-input" type="checkbox" value="A" @change="basicSearch" />
          <label class="form-check-label" for="defaultCheck1"> 
            Almoço 
          </label>
        </div>
        <div class="form-check">
          <input v-model="getPesquisa.categoria" class="form-check-input" type="checkbox" value="L" @change="basicSearch" />
          <label class="form-check-label" for="defaultCheck1">
            Lanche 
          </label>
        </div>
        <div class="form-check">
          <input v-model="getPesquisa.categoria" class="form-check-input" type="checkbox" value="J" @change="basicSearch" />
          <label class="form-check-label" for="defaultCheck1">
            Janta 
          </label>
        </div>
        <div class="form-check">
          <input v-model="getPesquisa.categoria" class="form-check-input" type="checkbox" value="S" @change="basicSearch" />
          <label class="form-check-label" for="defaultCheck1">
            Sobremesas
          </label>
        </div>
        <div class="form-check">
          <input v-model="getPesquisa.categoria" class="form-check-input" type="checkbox" value="B" @change="basicSearch" />
          <label class="form-check-label" for="defaultCheck1"> 
            Bebidas 
          </label>
        </div>
        <div class="form-check">
          <input v-model="getPesquisa.categoria" class="form-check-input" type="checkbox" value="V" @change="basicSearch" />
          <label class="form-check-label" for="defaultCheck1"> 
            Vegana 
          </label>
        </div>
      </div>
      <button class="search-button btn btn-primary" type="submit">
        Filtrar
      </button>
    </form>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Sidebar",
  computed: mapGetters(['getPesquisa']),

  methods: {
    ...mapActions(['basicSearch'])
  },

};
</script>

<style scoped>
/* Sidebar */

#sidebar {
  padding: 1em;
  width: 12%;
  background-color: #f3efef;
  border-right: 1px solid black;
  float: left;
}

.stars-sidebar {
  font-size: 1em;
}

#order-by {
  border-bottom: 1px solid black;
  padding-bottom: 1em;
}

#intel,
#categories {
  padding-top: 1em;
}

#intel {
  border-bottom: 1px solid black;
}

#sidebar .input-label-sidebar {
  border-radius: 1em 1em 0 0;
  margin-bottom: -1px;
}

#sidebar label,
#sidebar select,
#sidebar input {
  font-size: 12px;
  text-align: center;
  padding: 0;
}

#sidebar select,
#sidebar input {
  border-radius: 0 0 1em 1em;
}
</style>