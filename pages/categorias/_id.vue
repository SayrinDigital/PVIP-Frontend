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


        <Searcher></Searcher>

    <section v-if="category.escorts" class="uk-section">
      <div class="uk-container tm-container-medium">
        <div class="uk-child-width-1-4@m uk-child-width-1-2 uk-grid-small  uk-grid" uk-grid>
          <GirlCard type="hlgirl" :escort="escort"  v-for="escort in category.escorts" :key="escort.id"></GirlCard>
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
   return { category: data }
 },
 data(){
   return{
      baseUrl: 'http://localhost:1337'
   }
 },
   components: {
     GirlCard,
     Searcher
   },
   transition: 'basic',

}
</script>
