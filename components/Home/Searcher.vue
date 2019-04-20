<template>
<div class="uk-section pv-background-dark pv-box-shadow">

  <div class="uk-container tm-container-medium uk-text-center">

    <h2 class="light">Date un gusto con una chica exclusiva.</h2>

    <form action="">
        <div class="uk-grid uk-grid-medium uk-flex uk-flex-middle" uk-grid>
          <div class="uk-width-expand">
            <div>
              <Multiselect id="mainsearch" @input="filteringInput()" :close-on-select="false" deselectLabel="Presionar enter para quitar" selectLabel="Presiona enter para elegir" :multiple="true" v-model="tagstosearch" group-values="options" placeholder="Filtrar por características" group-label="name"  :options="tags"></Multiselect>
            </div>
          </div>
        </div>
    </form>

  <!--<nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">

        <div class="uk-navbar-item">
          <form class="uk-search uk-search-navbar">
            <span uk-search-icon></span>
            <input class="uk-search-input main-search" type="search" placeholder="Encuentra por etiquetas o por nombre">
          </form>
        </div>

      </div>
    </nav>-->

    <!--<h5 class="light">Etiquetas Populares</h5>

    <div class="tag-list uk-text-center">
      <div>Con Video</div>
      <div>Cara Visible</div>
      <div>Con Experiencias</div>
      <div>Disponible Ahora</div>
      <div>En Promoción</div>
    </div>-->

  </div>

</div>
</template>

<script>


import Multiselect from 'vue-multiselect'

export default {

  props: ['tags'],
  data(){
    return{
      tagstosearch: null
    }
  },
  methods:{
    filter(){
      //this.$emit('filtered', this.tagstosearch)
    },
    filteringInput(){
      this.$emit('filtered', this.tagstosearch)
    }
  },
 
  computed: {
    
  },
  components:{
    Multiselect
  }

}
</script>
