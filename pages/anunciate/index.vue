<template>
<div>

  <section class="uk-section  uk-cover-container">
    <video class="low-opacity" autoplay muted loop playsinline uk-cover>
      <source src="https://api.privadosvip.cl/uploads/33409131994d49e9aeda20837539f81b.mp4">
    </video>
    <div class="uk-container tm-container-medium uk-position-relative">
      <div class="uk-width-large uk-text-center uk-margin-auto">
        <h1 class="light">Publícate</h1>
        <p>Bienvenida, sabemos que tu tiempo es valioso y no queremos abrumarte con las innumerables razones por las que debes anunciar con nosotros, pero si te contaremos algo, somos Líderes en Resultados, que no te cuenten cuentos, con nosotros conseguirás
          los clientes respetuosos y solventes que buscas, estás a solo un paso de tomar una excelente decisión.</p>
      </div>
    </div>
  </section>

  <section class="uk-section">

    <div class="uk-container tm-container-medium">
      <h2 class="uk-text-center light uk-margin-large-bottom">Valores de Publicaciones</h2>
      <div class="uk-child-width-expand@m" uk-grid>
        <div v-for="ad in ads">
          <VueMarkdown class="markdown">{{ ad.contenido }}</VueMarkdown>
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
            <h4 class="hl">Las categorías se basan en los siguientes criterios</h4>
            <p>Para anunciarte debes concurrir a una breve entrevista con tu cédula nacional de identidad, pasaporte, o documento de tu país de origen, idealmente solicita una hora de atención. El servicio esta disponible únicamente para personas mayores de 18 años y que actúan por plena decisión personal. Las fotografías deben estar en alta resolución, con el rostro descubierto y reconocible, nosotros nos encargaremos de difuminarlo en el caso que así lo desees. Los anuncios son intransferibles. Anuncios recibidos con posteridad a las 17hrs quedarán habilitados el día hábil siguiente.</p>
         </div>
       </div>
     </div>

    </div>
  </section>



</div>
</template>

<script>
import {mapState} from 'vuex'
import VueMarkdown from 'vue-markdown'

export default {

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
