<template>

  <div v-if="business">

    <section class="uk-section">
      <div class="uk-container tm-container-medium uk-position-relative">
        <div class="uk-width-large uk-text-center uk-margin-auto">
          <h1 class="light">{{ business.nombre }} | Servicios</h1>
          <p>{{ business.descripcion }}</p>
        </div>
      </div>
    </section>

    <section class="uk-section">
      <div class="uk-container tm-container-medium">
        <div class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>
          <Card :business="busi" v-for="busi in business.negocios" :key="busi.id"></Card>
        </div>
      </div>
    </section>

  </div>

</template>

<script>

import axios from '~/plugins/axios'

import Card from '~/components/Business/Card'

export default {

  async asyncData ({ params }) {
   let { data } = await axios.get('/servicios/'+ params.id)
   return { business: data }
 },
  components: {
    Card
  },
  transition: 'basic',

}
</script>
