<template>

  <div v-if="category">
    <section class="uk-section  uk-cover-container">
      <video v-if="category.cover" class="low-opacity" autoplay muted loop playsinline uk-cover>
        <source :src="baseUrl + category.cover.url">
      </video>
      <div class="uk-container tm-container-medium uk-position-relative">
        <div class="uk-width-large uk-text-center uk-margin-auto">
          <h1 class="light">{{ category.nombre }}</h1>
          <p>{{ category.descripcion }}</p>
        </div>
      </div>
    </section>


        <Searcher :tags="finaltags"  @filtered="filterthis"></Searcher>

    <section v-if="category.escorts" class="uk-section">
      <div class="uk-container tm-container-medium">
        <div class="uk-child-width-1-4@m uk-child-width-1-2 uk-grid-small  uk-grid" uk-grid>
          <div v-if="hasbeenfiltered">
            <GirlCard type="hlgirl" :escort="escort"  v-for="escort in filteredescort" :key="escort.id"></GirlCard>
          </div>
          <div v-else>
            <GirlCard type="hlgirl" :escort="escort"  v-for="escort in category.escorts" :key="escort.id"></GirlCard>
            </div>
        </div>
      </div>
    </section>

  </div>

</template>

<script>
import axios from '~/plugins/axios'
import GirlCard from '~/components/GirlCard'
import Searcher from '~/components/Home/Searcher'
export default {

  async asyncData ({ params }) {
   let { data } = await axios.get('/categorias/'+ params.id)
   let tags = await axios.get('/etiquetas')
   return { category: data, tags: tags.data }
 },
 data(){
   return{
      baseUrl: 'https://api.privadosvip.cl',
      filteredescort: null,
      hasbeenfiltered: false
   }
 },
 filterthis (value) {
      //this.filteredescort = this.escorts

      if(!value){
        this.hasbeenfiltered = false
      }else{
        this.hasbeenfiltered = true

      var tofilterescorts = this.category.escorts
      var filter = tofilterescorts.filter((escort, index, array ) => {
        return value.every(i => escort.etiquetas.includes(i))
      })

      this.filteredescort = filter
      }

      console.log(filter) // someValue
    },
 computed: {
finaltags: function() {

      var ftags = []

      for (var i = 0; i < this.tags.length; i++) {

        var mult = ' '

        if (this.tags[i].multiple) {
          mult = ' '
        }

        var options =  this.tags[i].opciones.split(',')
        var foption = []

        for(var j=0; j<options.length; j++){
          if(this.tags[i].nombre == 'otros'){
          foption.push(options[j])
        }else{
          foption.push(this.tags[i].nombre + ' ' + options[j])
        }
        }

        ftags.push({
          name: this.tags[i].nombre + mult,
          options: foption
        })

      }
      return ftags
    }
 },
   components: {
     GirlCard,
     Searcher
   },
   transition: 'basic',

}
</script>
