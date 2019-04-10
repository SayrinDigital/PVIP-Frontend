<template>
<div>

  <section v-if="anunciate" class="uk-section  uk-cover-container">
    <video v-if="anunciate.cover" class="low-opacity" autoplay muted loop playsinline uk-cover>
      <source :src="'https://api.privadosvip.cl/' + anunciate.cover.url ">
    </video>
    <div class="uk-container tm-container-medium uk-position-relative">
      <div class="uk-width-large uk-text-center uk-margin-auto">
        <h1 class="light">Publícate</h1>
        <p>{{ anunciate.descripcion }}</p>
      </div>
    </div>
  </section>

  <section class="uk-section">

    <div class="uk-container tm-container-medium">
      <h2 class="uk-text-center light uk-margin-large-bottom">Valores de Publicaciones</h2>
      <div class="uk-child-width-expand@m" uk-grid>
        <div v-for="ad in ads">
          <VueMarkdown class="markdown uk-text-left@s uk-text-center">{{ ad.contenido }}</VueMarkdown>
        </div>
      </div>
    </div>



  </section>

  <div class="uk-container tm-container-medium">
    <hr class="uk-hr light">
  </div>

  <section class="uk-section">
    <div class="uk-container tm-container-medium">

     <div class="uk-child-width-1-2@m" uk-grid>
       <div>
         <div>
            <h4 class="hl">Las categorías se basan en los siguientes criterios</h4>
            <ul class="uk-list list-anouncehere">
              <li v-for="category in categories" :key="category.id">{{ category.nombre }}: {{ category.descripcion }}</li>
            </ul>
         </div>
       </div>
       <div>
         <div>
            <h4 class="hl">Información y Requisitos</h4>
            <p>Para anunciarte coordinaremos a una breve entrevista donde debes contar con tu cédula nacional de identidad, pasaporte, o documento de tu país de origen. El servicio esta disponible únicamente para personas mayores de 18 años y que actúan por plena decisión personal. Las fotografías deben ser de buena calidad, con el rostro descubierto, difuminaremos el rostro en el caso que así lo desees. Los anuncios son solo para la persona entrevistada y no se puede transferir o compartir con otra persona.</p>
         </div>
       </div>
     </div>

    </div>
  </section>



</div>
</template>

<script>
import axios from '~/plugins/axios'
import {mapState} from 'vuex'
import VueMarkdown from 'vue-markdown'

export default {

  async asyncData ({ params }) {
   let { data } = await axios.get('/anunciates/')
   return { anunciate: data[0] }
 },
  transition: 'basic',
  computed: {
  ...mapState({
    categories: state => state.categories.categories,
    ads: state => state.adstype.ad
  })
},
components: {
  VueMarkdown
}

}
</script>
