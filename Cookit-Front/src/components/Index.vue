<template>
  <div>
    <Sidebar />
    <div id="keywords" class="row">
      <div class="col-sm form-group">
        <div class="row"
          >
          <div class="border border-dark p-1 rounded-pill"
          v-for="(t, i) in getPesquisa.ingredientes"
          :key="t + i"
          >
            <span>
              {{ t }}
            </span>
            <span @click="removeTag(getPesquisa.ingredientes, i), basicSearch()">
              <i class="fas fa-times-circle"></i>
            </span>
          </div>
        </div>
        <div>
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Quero que tenha"
            v-model="tenha_nome"
          />
          <button type="button" class="btn btn-secondary" @click="addTag(getPesquisa.ingredientes, tenha_nome), basicSearch()">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div class="col-sm form-group">
        <div class="row"
          >
          <div class="border border-dark p-1 rounded-pill"
          v-for="(n, i) in getPesquisa.n_ingredientes"
          :key="n + i"
          >
            <span>
              {{ n }}
            </span>
            <span @click="removeTag(getPesquisa.n_ingredientes, n), basicSearch()">
              <i class="fas fa-times-circle"></i>
            </span>
          </div>
        </div>
        <div>
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Quero que não tenha"
            v-model="naotenha_nome"
          />
          <button type="button" class="btn btn-secondary" @click="addTag(getPesquisa.n_ingredientes, naotenha_nome), basicSearch()">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
    <div
      class="cards-tela-inicial row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3"
    >
      <div v-for="receita in allReceitas" v-bind:key="receita.id" class="col mb-4">
        <div v-if="receita.dono_receita.visivel" class="card receita-tela-inicial h-100">
          <a href="">
            <!--TODO: o tamanho da imagem precisa ser fixo e seu container também-->
            <!--<img v-bind:src="article.image" alt="">-->
            <img v-bind:src="receita.fotos" alt="" class="card-img-top" />
            <!-- ToDo: Arrumar uma forma de referenciar imagens  
            <img src="{{ receita.fotos.url }}" alt="{{ receita.nome_receita }}" class="card-img-top">
            -->
            <!--<img v-bind:src="article.image" alt="">-->
            <!--<img v-bind:src="1843875.jpg" class="card-img-top" alt="..." />-->
          
          </a>
          <div class="card-body">
            <a href="" class="fav-tela-inicial">
              <i class="far fa-heart"></i>
            </a>
            <a href="">
              <h5 class="card-title">{{ receita.nome_receita }}</h5>
            </a>
            <p class="card-text">
              Publicado por
              <a style="font-size: 12px" href="">
                <strong> {{ receita.dono_receita.first_name }} </strong>
              </a>
            </p>
            <p class="card-text">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </p>
            <p class="card-text descricao-tela-inicial">
              {{ receita.modo_preparo }}
            </p>
            <hr />
            <div class="row">
              <div class="info-tela-inicial col">
                <div class="row">
                  <div class="col">
                    <i style="font-size: 25px" class="far fa-clock"></i>
                    <p>
                      {{ receita.tempo_preparo }}
                      {{ receita.tempo_unidade_medida }}
                    </p>
                  </div>
                  <div class="col">
                    <i
                      style="font-size: 25px"
                      class="fas fa-concierge-bell"
                    ></i>
                    <p>{{ receita.porcoes }} porções</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            @click="$router.push({name: 'PaginaReceita', params: {id: receita.id}})"
            class="see-more-tela-inicial btn"
          >
            <i class="fas fa-book-open"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Sidebar from "./parciais/Sidebar";

export default {
  name: "Index",

  data(){
    return{
      tenha: [],
      naotenha: [],
      tenha_nome: '',
      naotenha_nome: '',
    }
  },
  
  components: {
    Sidebar,
  },

  methods: {
    ...mapActions(['fetchReceitas']),
    ...mapActions(['basicSearch']),
    addTag(tags, nome){
      if(nome != ''){
        tags.push(nome);
      }
      if(this.tenha_nome == nome)
        this.tenha_nome = ''
      else
        this.naotenha_nome = ''
    },
    removeTag(tags, index) {
      tags.splice(index, 1);
    }
  },

  computed: mapGetters(['allReceitas', 'getPesquisa']),

  created(){
    this.fetchReceitas();
  }
};
</script>

<style scoped>
.tags{
  display: flex;
}
#keywords {
  margin-top: 70px;
}
.descricao-tela-inicial {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  /* number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.receita-tela-inicial {
  /*    padding: 2em 2em 0 2em !important; */
  background-color: white;
  /*    border-radius: 0.5em; */
}
.cards-tela-inicial {
  /*    margin: 1em !important;
        border-radius: 1em;
        border: 1px solid #707070; */
  padding-top: 1em;
  position: relative;
}
a {
  text-decoration: none !important;
  color: black;
}
a:hover {
  color: black;
}
.utensils-tela-inicial {
  text-align: center;
  height: 2em;
  width: 2em;
  border: 1px solid gray;
  background-color: lightgray;
}
div p,
ul li {
  font-size: 12px;
}
.prep-mode-tela-inicial {
  border-bottom: 1px solid gray;
  margin-bottom: 1em;
}
.ingredients-tela-inicial {
  padding-left: 2em !important;
  border-left: 1px solid gray;
}
.see-more-tela-inicial {
  width: 100%;
  align-self: center;
  /*    border-radius: 1em 1em 0 0 !important; */
  border-top: 1px solid gray;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  background-color: lightgray;
  color: black;
  /*    font-size: 1.5em; */
}
.see-more-tela-inicial:hover {
  background-color: gray;
  border-color: black;
}
.info-tela-inicial {
  text-align: center;
}
.fa-star {
  color: orange;
}
#keywords {
  border-bottom: 1px solid black;
}
.card-img-top {
  object-fit: cover;
  object-position: center;
  height: 180px;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
}
.descricao-tela-inicial {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify !important;
  margin-bottom: 1em;
  height: 70px;
}
.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #aba11b;
  font-weight: bold;
  text-align: center;
}
.fav-tela-inicial {
  position: relative !important;
  float: right !important;
}
.card-text {
  text-align: center;
}
hr {
  border-color: black;
}
.form-group {
  margin-top: 1rem;
}
</style>
