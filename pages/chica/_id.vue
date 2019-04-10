<template>

  <div>

   <section v-if="escort" class="uk-section">
     <div class="uk-container tm-container-medium">
       <div class="profile-information">
         <div class="uk-flex uk-flex-middle uk-grid-match" uk-grid>
           <div v-if="escort.avatar" class="uk-width-2-5@m">
             <div>
                <div class="avatar uk-background-cover uk-position-relative" uk-img :data-src="baseUrl + escort.avatar.url">
                  <div v-if="escort.telefono" class="uk-position-top-left">
                    <div class="uk-overlay">
                      <a class="card-gray hl uk-display-block body" :href="'tel:' + escort.telefono">
                       <p style="line-height: 1.5;" class="light uk-margin-remove"><span class="uk-icon" uk-icon="receiver"></span></p>
                      </a>
                    </div>
                  </div>
                </div>
             </div>
           </div>
           <div  class="uk-width-3-5@m about-girl">
             <div class="content">
               <h1 class="light"><span v-if="escort.user" class="uk-text-capitalize">{{ escort.user.nombre }}</span>  <span class="price">{{ escort.precio | currency('CLP ', 0, { thousandsSeparator: '.' }) }}/hr</span> </h1>

               <p class="tag-title uk-margin-remove">Sobre Mi</p>
               <p class="description uk-margin-remove-top">{{ escort.acerca }}</p>

              <div class="uk-child-width-expand@s uk-grid-small uk-text-center" uk-grid>
                <div>
                  <div class="card-gray body">
                    <p class="uk-margin-remove"><span class="uk-icon uk-margin-small-right" uk-icon="world"></span>{{ escort.nacionalidad }}</p>
                  </div>
                </div>
                <div v-if="escort.whatsapp" >
                  <a class="card-gray body uk-display-block" target="_blank" :href="'https://wa.me/' + escort.whatsapp +'?text=' + finalwspmessage ">
                    <p class="uk-margin-remove"><span class="uk-icon uk-margin-small-right" uk-icon="whatsapp"></span>{{ escort.whatsapp }}</p>
                  </a>
                </div>
                <div>
                  <div class="card-gray body uk-text-center">
                    <p class="uk-margin-remove uk-flex uk-flex-middle uk-display-inline"><img width="20" class="uk-margin-small-right" src="/assets/icons/weight.svg" alt="">{{ escort.peso }} kg.</p>
                  </div>
                </div>
                <div>
                  <div class="card-gray body">
                    <p class="uk-margin-remove uk-display-inline"><img width="22" class="uk-margin-small-right" src="/assets/icons/ruler.svg" alt="">{{ escort.altura }} cm.</p>
                  </div>
                </div>
              </div>

              <div class="uk-child-width-expand@s" uk-grid>
                <div>
                  <div class="card-gray uk-width-auto body">
                    <div class="uk-grid-small uk-text-center uk-flex uk-flex-middle" uk-grid>
                      <div class="uk-width-auto">
                        <div class="location-icon">
                         <img src="/assets/icons/location.svg" alt="">
                        </div>
                      </div>
                      <div class="uk-width-expand">
                        <div>
                          <p class="light uk-margin-remove">{{ escort.ubicacion }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="card-gray uk-width-auto body">
                    <div class=" uk-grid-small uk-text-center uk-flex uk-flex-middle" uk-grid>
                      <div class="uk-width-auto">
                        <div v-bind:class="{ disabled: !escort.conestacionamiento }" class="garage-icon">
                         <img src="/assets/icons/garage.svg" alt="">
                        </div>
                      </div>
                      <div class="uk-width-expand">
                        <div>
                          <p class="light uk-margin-remove"><span v-if="escort.conestacionamiento">Con </span><span v-else>Sin </span> Estacionamiento</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

             </div>

           </div>
         </div>

         <section v-if="escort.etiquetas" class="uk-section uk-section-small">
           <div class="tags-container card-gray body">
              <div v-for="tag in escort.etiquetas" :key="tag.id">{{ tag }}</div>
           </div>
         </section>

       </div>
     </div>
   </section>

   <!--<section class="uk-section story-section">

     <div class="content">
       <div class="uk-container tm-container-medium">
         <h3 class="light uk-margin-medium-bottom">Historias</h3>
       </div>

       <div v-swiper:mySwiper="swiperOption" >
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in banners">
          <div class="uk-background-cover story-card" :data-src="banner" uk-img>

          </div>
        </div>
      </div>

    </div>
     </div>

   </section>-->

   <section>

   <div class="uk-container tm-container-medium">

    <div class="uk-child-width-1-2@s" uk-grid="masonry: true">
      <div>
        <div class="card-gray uk-card uk-card-body">
            <h4 class="light uk-margin-medium-bottom">Servicios</h4>
            <div class="uk-child-width-1-2@s" uk-grid>
              <div>
                <div>
                  <h5 class="hl">Incluidos</h5>
                  <ul class="uk-list list-anouncehere">
                    <li :uk-tooltip="included.descripcion" v-for="included in escort.incluidos">{{ included.nombre }}</li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <h5 class="hl">Adicionales</h5>
                  <ul class="uk-list list-anouncehere">
                    <li :uk-tooltip="adicional.descripcion" v-for="adicional in escort.adicionales">{{ adicional.nombre }}</li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div>
        <div v-if="escort.calendario" class="card-gray uk-card uk-card-body">
            <h4 class="light uk-margin-medium-bottom">Horario</h4>
            <div>
               <div class="uk-child-width-expand@m uk-grid-small" uk-grid>
                 <div v-for="date in escort.calendario">
                   <div class="work-time">
                      <div class="day uk-text-capitalize">{{ date.day | truncate(3) }}</div>
                      <div class="hour uk-text-capitalize"><span v-if="date.fulltime">FULL TIME</span><span v-else>{{ date.start }} - {{ date.end }}</span></div>
                   </div>
                 </div>
               </div>
            </div>
        </div>
      </div>
      <div>
        <div class="card-gray uk-card uk-card-body" style="opacity: 0;"></div>
      </div>
      <div>
        <div  class="card-gray uk-card uk-card-body">
          <h4 class="light">Calificaciones</h4>
          <p>La escort no cuenta con calificaciones.</p>
          <div class="uk-margin uk-text-center">
            <button @click="firstqualify()" class="uk-button basic">Sé el primero en calificarla!</button>
          </div>
        </div>
      </div>

    </div>

   </div>

   </section>

   <section v-if="escort.fotos" class="uk-section">
     <div class="uk-container tm-container-medium">
       <h3 class="light uk-margin-medium-bottom">Galería</h3>
       <div class="uk-child-width-1-4@m uk-child-width-1-2 uk-grid-medium uk-grid" ref="lightbox" uk-lightbox="animation: slide" uk-grid>
         <div v-if="foto.imagen" v-for="foto in escort.fotos">
           <a class="uk-position-relative uk-display-block" data-type="image" :href="baseUrl + foto.imagen.url">
             <div class="uk-background-cover gallery-girl-photo" uk-img :data-src="baseUrl + foto.imagen.url">
             </div>
          <img class="uk-position-center watermark" src="/assets/watermark.png" alt="">
           </a>
         </div>
       </div>
     </div>
   </section>

   <!--<section class="uk-section">
     <div class="uk-container tm-container-medium">
       <h3 class="light uk-margin-medium-bottom">Comentarios</h3>

     </div>
   </section>-->

  </div>

</template>

<script>

import axios from '~/plugins/axios'
import {mapState} from 'vuex'

let UIkit;
if (process.browser) {
  UIkit = require('uikit');
}

export default {
  head () {
    return {
      title: this.escort.user.nombre +' | Privados VIP: Escorts, Acompañantes y Masajes Eróticos',
      meta: [
        { hid: 'og-title', property: 'og:title', content: this.escort.user.nombre +' | Privados VIP: Escorts, Acompañantes y Masajes Eróticos' },
        { hid: 'og-sitename', property: 'og:site_name', content: 'Sayrin - Agencia Digital' },
        { hid: 'og-description', property: 'og:description', content: 'Escorts, Acompañantes y Masajes Eróticos'},
        { hid: 'description', name: 'description', content: 'Escorts, Acompañantes y Masajes Eróticos' },
        { hid: 'og-image', name: 'og:image', content: this.baseUrl + this.escort.avatar.url },
        { hid: 'og-url', name: 'og:url', content: 'https://privadosvip.cl/chica/' +  this.escort._id },
        // other meta
      ]
    }
  },
  async asyncData ({ params }) {
   let { data } = await axios.get('/escorts/'+ params.id)
   return { escort: data }
 },
    data () {
      return {
        baseUrl: 'https://api.privadosvip.cl',
        banners: [ 'https://images.unsplash.com/photo-1549053755-0a207aae1488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80', 'https://images.unsplash.com/photo-1524860432737-bee41d4136ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        'https://images.unsplash.com/photo-1506691318991-c91e7df669b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=321&q=80',
        'https://images.unsplash.com/photo-1505075135786-46bf381343c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        'https://images.unsplash.com/photo-1510949301223-cc9825b390ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80',
        'https://images.unsplash.com/photo-1469460340997-2f854421e72f?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&auto=format&fit=crop&w=351&q=80',
        'https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixlib=rb-1.2.1&auto=format&fit=crop&w=342&q=80'
       ],
        swiperOption: {
        spaceBetween: 30,
        centeredSlides: false,
        slidesPerView: 7,
        slidesOffsetBefore: 40,
        slidesOffsetAfter: 40,
          pagination: {
            el: '.swiper-pagination',
          },
          breakpoints: {
            1200: {
              slidesPerView: 7,
              slidesOffsetBefore: 40,
              slidesOffsetAfter: 40,
            },
            960: {
              slidesPerView: 4,
              slidesOffsetBefore: 30,
              slidesOffsetAfter: 30,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
              slidesOffsetBefore: 15,
              slidesOffsetAfter: 15,
            }
          }
        }
      }
    },
    mounted() {
      //this.mySwiper.slideTo(3, 1000, false
      const { lightbox } = this.$refs

    },
  methods: {
   showing(){
     console.log('owo')
   },
   firstqualify(){
     this.$swal("Oh oh!", "Tienes que ser cliente registrado para calificar.", "error")
   }
},
computed: {
  ...mapState({
    wspmessage: state => state.whatsapp.message,
  }),
  finalwspmessage: function() {
    let finalmessage = this.wspmessage[0].mensaje
    return finalmessage.replace('{{ nombre }}', this.escort.user.nombre)
  }
},
transition: 'basic',
  }
</script>
