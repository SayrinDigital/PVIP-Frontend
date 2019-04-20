<template>

  <div>

    <section class="uk-section" v-if="business">
      <div class="uk-container tm-container-medium">
        <div class="profile-information">
          <div class="uk-flex uk-flex-middle uk-grid-match" uk-grid>
            <div class="uk-width-2-5@m">
              <div>
                 <div class="avatar uk-background-cover" v-if="business.avatar" uk-img :data-src="baseUrl + business.avatar.url"></div>
              </div>
            </div>
            <div  class="uk-width-3-5@m about-girl">
              <div class="content">
                <h1 class="uk-text-capitalize light">{{ business.user.nombre }}</h1>

                <p class="tag-title uk-margin-remove">Sobre Nosotros</p>
                <p class="description uk-margin-remove-top">{{ business.descripcion }}</p>

               <!--<div class="uk-child-width-expand@s uk-grid-small uk-text-center" uk-grid>
                 <div>
                   <a href="https://sayrin.cl" target="_blank" class="card-gray body uk-display-block">
                     <p class="uk-margin-remove"><span class="uk-icon uk-margin-small-right" uk-icon="world"></span>https://sayrin.cl</p>
                   </a>
                 </div>
                 <div>
                   <div class="card-gray body">
                     <p class="uk-margin-remove"><span class="uk-icon uk-margin-small-right" uk-icon="calendar"></span>Trigueña</p>
                   </div>
                 </div>
                 <div>
                   <div class="card-gray body">
                     <p class="uk-margin-remove"><span class="uk-icon uk-margin-small-right" uk-icon="user"></span>1.63 cm</p>
                   </div>
                 </div>
                 <div>
                   <div class="card-gray body">
                     <p class="uk-margin-remove"><span class="uk-icon uk-margin-small-right" uk-icon="hashtag"></span>53 kg.</p>
                   </div>
                 </div>
               </div>-->

               <div class="uk-child-width-expand@s" uk-grid>
                 <div>
                   <a target="_blank" :href="'https://www.google.com/maps/place/' + business.direccion " class="card-gray uk-width-auto body uk-display-block">
                     <div class="uk-grid-small uk-text-center uk-flex uk-flex-middle" uk-grid>
                       <div class="uk-width-auto">
                         <div class="location-icon">
                          <img src="/assets/icons/location.svg" alt="">
                         </div>
                       </div>
                       <div class="uk-width-expand">
                         <div>
                           <p class="light uk-margin-remove">{{ business.direccion }}</p>
                         </div>
                       </div>
                     </div>
                   </a>
                 </div>

                 <div>
                   <a target="_blank" :href="'http://' + business.web" class="card-gray uk-width-auto body uk-display-block">
                     <div class=" uk-grid-small uk-text-center uk-flex uk-flex-middle" uk-grid>
                       <div class="uk-width-auto">
                         <div class="garage-icon disabled">
                          <img src="/assets/icons/worldwide.svg" alt="">
                         </div>
                       </div>
                       <div class="uk-width-expand">
                         <div>
                           <p class="light uk-margin-remove">{{ business.web }}</p>
                         </div>
                       </div>
                     </div>
                   </a>
                 </div>

               </div>

              </div>

            </div>
          </div>



        </div>
      </div>
    </section>

    <section class="uk-section">
      <div class="uk-container tm-container-medium">
        <h3 class="light uk-margin-medium-bottom">Galería</h3>
        <div class="uk-child-width-1-4@m uk-child-width-1-2 uk-grid-medium uk-grid" ref="lightbox" uk-lightbox="animation: slide" uk-grid>
        <div v-if="foto.imagen" v-for="foto in business.fotos">
          <a class="uk-position-relative uk-display-block" data-type="image" :href="baseUrl + foto.imagen.url">
            <div class="uk-background-cover gallery-girl-photo" uk-img :data-src="baseUrl + foto.imagen.url">
            </div>
            <!--<img class="uk-position-center watermark" src="/assets/watermark.png" alt="">-->
          </a>
        </div>
      </div>
      </div>
    </section>

  </div>

</template>

<script>

import axios from '~/plugins/axios'

export default {
async asyncData ({ params }) {
   let { data } = await axios.get('/negocios/'+ params.id)
   return { business: data}
 },
  transition: 'basic',
  data(){
    return{
      baseUrl: 'https://api.privadosvip.cl'
    }
  }

}
</script>
