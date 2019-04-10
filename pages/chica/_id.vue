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
          <div class="uk-width-3-5@m about-girl">
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
                <div v-if="escort.whatsapp">
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
          <div class="card-gray uk-card uk-card-body">
            <h4 class="light">Calificaciones</h4>
            <p>La escort <span v-if="escort.calificacions.length == 0">no</span> cuenta con <span  v-if="escort.calificacions.length>0"> {{ escort.calificacions.length }}</span> calificacion<span v-if="escort.calificacions.length>1">es</span>.</p>
            <div class="uk-margin uk-text-center">
              <button uk-toggle="target: #finalscoremodal"  v-if="escort.calificacions.length>0" class="uk-button basic">Ver Calificaciones</button>
              <button @click="openQualifyModal" class="uk-button basic"><span v-if="escort.calificacions.length == 0">Sé el primero en calificarla!</span><span v-else>Califícame</span></button>

            </div>
            <div id="finalscoremodal" class="uk-modal-container" uk-modal>
               <div class="uk-modal-dialog uk-modal-body">
                 <button class="uk-modal-close-default" type="button" uk-close></button>
                  <div>
                      <div class="uk-child-width-1-2@s" uk-grid>
                         <div>
                           <div class="uk-card card-gray body">
                             <div>
                               <h2 class="hl">Tabla de Calificación</h2>
                               <div v-for="score in finalscore">
                                 <table class="uk-table uk-table-small uk-table-divider">
                                   <thead>
                                     <tr>
                                       <th><h3 class="hl">{{ score.nombre }}</h3></th>
                                       <th><h4 class="hl">{{ score.puntaje | round }}</h4></th>
                                     </tr>
                                   </thead>
                                   <tbody>
                                     <tr v-for="option in score.car">
                                       <td><h6>{{ option.nombre }}</h6></td>
                                       <td><h6>{{ option.puntaje | round }}</h6></td>
                                     </tr>
                                   </tbody>
                                 </table>
                               </div>
                             </div>
                           </div>
                         </div>
                         <div>
                           <div>
                             <h3 class="hl">Comentarios</h3>


                             <div v-for="(comment,index) in escort.calificacions">

                               <div v-if="index == 0">
                                 <div class="uk-margin uk-flex uk-flex-middle uk-grid-medium" uk-grid>
                                   <div class="uk-width-1-5 uk-visible@s">
                                     <div>
                                       <h6 class="uk-margin-remove">Fecha</h6>
                                     </div>
                                   </div>
                                   <div class="uk-width-3-5">
                                     <div>
                                       <h6 class="uk-margin-remove">Comentario</h6>
                                     </div>
                                   </div>
                                   <div class="uk-width-1-5">
                                     <div class=" uk-text-right">
                                       <h6 class="uk-margin-remove"><span class="uk-icon" uk-icon="star"></span></h6>
                                     </div>
                                   </div>
                                 </div>
                               </div>

                                   <div class="commentary">
                                     <div class="uk-flex uk-flex-middle uk-grid-medium" uk-grid>
                                       <div class="uk-width-auto  uk-visible@s">
                                         <div>
                                           <p class="uk-margin-remove">{{ comment.resumen[0].fecha }}</p>
                                         </div>
                                       </div>
                                       <div class="uk-width-expand">
                                         <div>
                                           <h6 class="hl uk-margin-remove">{{ comment.resumen[0].cliente }}</h6>
                                           <p class="uk-margin-remove">{{ comment.resumen[0].comentario }}</p>
                                         </div>
                                       </div>
                                       <div  class="uk-width-auto">
                                         <div>
                                           <h6 class="hl uk-margin-remove">{{ comment.resumen[0].total | round }}</h6>
                                         </div>
                                       </div>
                                     </div>
                                   </div>
                             </div>
                           </div>
                         </div>
                      </div>
                  </div>
               </div>
            </div>
            <div v-if="$auth.loggedIn">
              <div v-if="$auth.user.role.name == 'Cliente'">
                <div ref="modalqualify" id="modal-qualify" class="" uk-modal>
                  <div class="uk-modal-dialog uk-modal-body">

                    <button class="uk-modal-close-default" type="button" uk-close></button>

                    <div>
                      <div>
                        <div>
                          <div class="rating">
                            <h2>Califícame</h2>
                          <form v-on:submit.prevent="sendCalification()">
                            <div v-for="form in formrating" :key="form.id">
                              <h3 class="hl">{{ form.nombre }}</h3>
                                <table class="uk-table uk-table-small uk-table-responsive">
                                  <thead>
                                    <tr>
                                      <th><h5>Característica</h5></th>
                                      <th><h5>Puntaje</h5></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="option in form.campos">
                                      <td><p>{{ option.nombre }}</p></td>
                                      <td><input class="uk-input" required type="number" v-model="option.puntaje" min="1" max="10" placeholder="0"></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div class="uk-margin">
                                <textarea required placeholder="Déjame un comentario" v-model="commentary" rows="4" class="uk-textarea"></textarea>
                              </div>
                              <div class="uk-margin">
                                <button type="submit" class="uk-button basic">Enviar</button>
                              </div>
                              </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    </div>
                </div>
              </div>
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
import {
  mapState
} from 'vuex'

let UIkit;
if (process.browser) {
  UIkit = require('uikit');
}

export default {
  head() {
    return {
      title: this.escort.user.nombre + ' | Privados VIP: Escorts, Acompañantes y Masajes Eróticos',
      meta: [{
          hid: 'og-title',
          property: 'og:title',
          content: this.escort.user.nombre + ' | Privados VIP: Escorts, Acompañantes y Masajes Eróticos'
        },
        {
          hid: 'og-sitename',
          property: 'og:site_name',
          content: 'Sayrin - Agencia Digital'
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: 'Escorts, Acompañantes y Masajes Eróticos'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Escorts, Acompañantes y Masajes Eróticos'
        },
        {
          hid: 'og-image',
          name: 'og:image',
          content: this.baseUrl + this.escort.avatar.url
        },
        {
          hid: 'og-url',
          name: 'og:url',
          content: 'https://privadosvip.cl/chica/' + this.escort._id
        },
        // other meta
      ]
    }
  },
  async asyncData({
    params
  }) {
    let { data } = await axios.get('/escorts/' + params.id)
    let form= await axios.get('/formulariocalificacions')
    return {
      escort: data,
      formrating: form.data
    }
  },
  data() {
    return {
      puntaje: "",
      commentary: "",
      finalscore: "",
              finalformrating: null,
      baseUrl: 'https://api.privadosvip.cl',
      banners: ['https://images.unsplash.com/photo-1549053755-0a207aae1488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80',
        'https://images.unsplash.com/photo-1524860432737-bee41d4136ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
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
    const {
      lightbox
    } = this.$refs

    this.getFinalQualification()

  },
  filters: {
    round: function(value){
      var round = Math.round(value * 100) / 100
      return round
    }
  },
  methods: {
    getFinalQualification(){

      let score = this.escort.calificacions
      let fscore = []

      var lugar = 0, llamada = 0, lugaratencion = 0, ppersonal = 0, fisico = 0, rostro = 0, busto = 0,
      trasero = 0, servicio = 0, besos = 0, quejidos = 0, mpelvicos = 0, oral = 0, vaginal = 0, anal = 0

      var qllamada = 0, qlugaratencion = 0, qppersonal = 0, qrostro = 0, qbusto = 0,
      qtrasero = 0, qbesos = 0, qquejidos = 0, qmpelvicos = 0, qoral = 0, qvaginal = 0, qanal = 0



      for(var i=0; i<score.length; i++){
        var resumen = score[i].resumen[0].resumen
        for(var j=0; j<resumen.length; j++){

          for(var y=0; y<resumen[j].campos.length; y++){
            switch (resumen[j].campos[y].nombre) {
              case 'Llamada':
                  llamada += parseFloat(resumen[j].campos[y].puntaje)
                  qllamada++
                break;
                case 'Lugar de atención':
                    lugaratencion += parseFloat(resumen[j].campos[y].puntaje)
                    qlugaratencion++
                  break;
                  case 'Presentación Personal':
                      ppersonal += parseFloat(resumen[j].campos[y].puntaje)
                      qppersonal++
                    break;
                    case 'Rostro':
                        rostro += parseFloat(resumen[j].campos[y].puntaje)
                        qrostro++
                      break;
                      case 'Busto':
                          busto += parseFloat(resumen[j].campos[y].puntaje)
                          qbusto++
                        break;
                        case 'Trasero':
                            trasero += parseFloat(resumen[j].campos[y].puntaje)
                            qtrasero++
                          break;
                          case 'Besos':
                              besos += parseFloat(resumen[j].campos[y].puntaje)
                              qbesos++
                            break;
                            case 'Quejidos':
                                quejidos += parseFloat(resumen[j].campos[y].puntaje)
                                qquejidos++
                              break;
                              case 'Mov. Pélvicos':
                                  mpelvicos += parseFloat(resumen[j].campos[y].puntaje)
                                  qmpelvicos++
                                break;
                                case 'Sexo Oral':
                                    oral += parseFloat(resumen[j].campos[y].puntaje)
                                    qoral++
                                  break;
                                  case 'Sexo Vaginal':
                                      vaginal += parseFloat(resumen[j].campos[y].puntaje)
                                      qvaginal++
                                    break;
                                    case 'Sexo Anal':
                                        anal += parseFloat(resumen[j].campos[y].puntaje)
                                        qanal++
                                      break;

            }
          }
        }
      }

      lugar = (llamada + lugaratencion + ppersonal) / (qllamada + qlugaratencion + qppersonal)
      fisico = (rostro + busto + trasero) / (qrostro + qbusto + qtrasero)
      servicio = (besos + quejidos + mpelvicos + oral + vaginal + anal) / (qbesos + qquejidos + qmpelvicos + qoral + qvaginal + qanal)


     this.finalscore = [
       {
         nombre: "Lugar y Presencia",
         puntaje: lugar,
         car: [
           {
             nombre : "Llamada",
             puntaje: llamada / qllamada
           },
           {
             nombre : "Lugar de Atención",
             puntaje: lugaratencion / qlugaratencion
           },
           {
             nombre : "Presentación Personal",
             puntaje: ppersonal / qppersonal
           }
         ]
       },
       {
         nombre: "Físico",
         puntaje: fisico,
         car: [
           {
             nombre : "Rostro",
             puntaje: rostro / qrostro
           },
           {
             nombre : "Busto",
             puntaje: busto / qbusto
           },
           {
             nombre : "Trasero",
             puntaje: trasero / qtrasero
           }
         ]
       },
       {
         nombre: "Servicio",
         puntaje: servicio,
         car: [
           {
             nombre : "Besos",
             puntaje: besos/qbesos
           },
           {
             nombre : "Quejidos",
             puntaje: quejidos/qquejidos
           },
           {
             nombre : "Mov. Pélvicos",
             puntaje: mpelvicos / qmpelvicos
           },
           {
             nombre : "Sexo Oral",
             puntaje: oral/qoral
           },
           {
             nombre : "Sexo Vaginal",
             puntaje: vaginal/qvaginal
           },
           {
             nombre : "Sexo Anal",
             puntaje: anal/qanal
           }
         ]
       }
     ]

    },
    sendCalification(){

     let finalrating = []
     let q = 0
     let total = 0
     var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


      for(var i=0; i<this.formrating.length; i++){
        q+= parseFloat(this.formrating[i].campos.length)
        for(var j=0; j<this.formrating[i].campos.length; j++){
          total+= parseFloat(this.formrating[i].campos[j].puntaje)
        }
      }

      finalrating.push({
        resumen: this.formrating,
        comentario : this.commentary,
        cliente: this.$auth.user.nombre,
        total: total/q,
        fecha: today
      })

      axios.post('/calificacions/',{
        resumen: finalrating,
        escort: this.escort._id,
        cliente: this.$auth.user.id
      })
      .then(response => {
        this.$swal("Gracias!", "Gracias por tu calificación!", "success").then(() =>{
          const { modalqualify } = this.$refs
            UIkit.modal(modalqualify).hide()
        })

      })
      .catch(error => {
        this.$swal("Oh!", "Si bien estás registrado, no eres un cliente.", "error")
      })
    },
    openQualifyModal(){
      if(this.$auth.loggedIn){
        if(this.$auth.user.role.name == 'Cliente'){
          const { modalqualify } = this.$refs
            UIkit.modal(modalqualify).show()
        }else{
          this.$swal("Oh!", "Si bien estás registrado, no eres un cliente.", "error")
        }
      }else{
        this.$swal("Oh oh!", "Tienes que ser cliente registrado para calificar.", "error")
      }
    },
    showing() {
      console.log('owo')
    },
    firstqualify() {
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
