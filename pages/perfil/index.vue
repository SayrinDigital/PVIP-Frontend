<template>
<div v-if="$auth.loggedIn">

  <div v-if="$auth.user" class="uk-section">
    <div v-if="$auth.user.escort" class="uk-container uk-container-small">
      <div class="uk-margin">
        <div class="card-gray uk-card uk-card-body">
          <h4 class="light">Configuración</h4>
          <p>Haz click en cualquier item para editarlo.</p>
          <div class="uk-margin">
            <div class="profile-information">
              <div class="uk-flex uk-flex-middle uk-grid-match" uk-grid>
                <div v-if="escort.avatar" class="uk-width-2-5@m">
                  <div>
                    <div class="avatar uk-background-cover" uk-img :data-src="baseUrl + escort.avatar.url"></div>
                  </div>
                </div>
                <div v-if="escort" class="uk-width-3-5@m about-girl">
                  <form class="content" v-on:submit.prevent="setBasicInformation()">
                    <div class="uk-margin">
                      <input type="text" v-model="escort.user.nombre" placeholder="Nombre" class="uk-input title uk-form-blank">
                    </div>
                    <div class="uk-margin">
                      <input type="text" v-model="escort.precio" placeholder="Precio por hora (99999)" class="uk-input price uk-form-blank">
                    </div>

                    <p class="tag-title uk-margin-remove">Sobre Mi</p>
                    <div>
                      <textarea class="uk-textarea uk-form-blank desc" v-model="escort.acerca" placeholder="Presentate" rows="6"></textarea>
                    </div>

                    <div class="uk-child-width-1-2@s uk-grid-small uk-text-center uk-margin" uk-grid>
                      <div>
                        <div class="card-gray body">
                          <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: world"></span>
                            <input class="uk-input uk-form-blank simple" v-model="escort.nacionalidad" placeholder="Nacionalidad" type="text">
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="card-gray body">
                          <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: whatsapp"></span>
                            <input class="uk-input uk-form-blank simple" v-model="escort.whatsapp" placeholder="+569" type="text">
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="card-gray body">
                          <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input class="uk-input uk-form-blank simple" v-model="escort.altura" placeholder="1.50 cm" type="text">
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="card-gray body">
                          <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: hashtag"></span>
                            <input class="uk-input uk-form-blank simple" v-model="escort.peso" placeholder="86 kg." type="text">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="uk-margin uk-text-right">
                      <button class="uk-button" type="submit">Guardar</button>
                    </div>

                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="uk-margin">
        <div class="card-gray uk-card uk-card-body">
          <h4 class="light">Servicios</h4>
          <div class="uk-margin">
            <h5 class="light">Incluidos</h5>
            <Multiselect v-model="includedservices" trackBy="nombre" :multiple="true" label="nombre" placeholder="Elegir servicios incluidos" :options="services" deselectLabel="Presionar enter para quitar" selectLabel="Presiona enter para elegir"></Multiselect>
          </div>
          <div class="uk-margin">
            <h5 class="light">Adicionales</h5>
            <Multiselect v-model="extraservices" trackBy="nombre" :multiple="true" label="nombre" placeholder="Elegir servicios incluidos" :options="services" deselectLabel="Presionar enter para quitar" selectLabel="Presiona enter para elegir"></Multiselect>
          </div>
        </div>
      </div>

      <div class="uk-margin">
        <div class="card-gray hour-picker uk-card uk-card-body">
          <h4 class="light">Horario</h4>
          <p>Puedes ser full time o usar un rango de horas específico.</p>
          <div class="uk-margin">
            <form v-on:submit.prevent="setHour()">
              <div>
                <div v-if="this.escort.calendario.length == 0" class="uk-child-width-1-2@s uk-grid" uk-grid>
                  <div v-for="day in days" :key="day.id">
                    <div class="uk-margin">
                      <p class="hl">{{ day.day }} : </p>
                      <div class="uk-child-width-1-2@s" uk-grid>
                        <div>
                          <input type="text" v-model="day.start" placeholder="09:00" class="uk-input">
                        </div>
                        <div>
                          <input type="text" v-model="day.end" placeholder="22:00" class="uk-input">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div  class="uk-child-width-1-2@s uk-grid" >
                    <div v-for="day in escort.calendario"  :key="day.id">
                      <p class="hl">{{ day.day }} : </p>
                      <div class="uk-child-width-1-2@s" uk-grid>
                        <div>
                          <input type="text" v-model="day.start" placeholder="09:00" class="uk-input">
                        </div>
                        <div>
                          <input type="text" v-model="day.end" placeholder="22:00" class="uk-input">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="uk-margin uk-text-right">
                <button class="uk-button" type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="uk-margin" v-if="finaltags">
        <div class="card-gray uk-card uk-card-body">
          <h4 class="light">Etiquetas</h4>
          <Multiselect :multiple="true" :close-on-select="false" placeholder="Elegir una opción" deselectLabel="Presionar enter para quitar" selectLabel="Presiona enter para elegir" group-values="options" group-label="name" v-model="value" :options="finaltags"></Multiselect>
        </div>
      </div>

      <div class="uk-margin">
        <div class="card-gray uk-card uk-card-body">
          <h4 class="light">Galería</h4>
          <p>Se permite hasta un máximo de 10 fotos.</p>
          <div v-if="$auth.user.escort.fotos">
            <div class="uk-child-width-1-4@m uk-child-width-1-2 uk-grid-medium uk-grid" uk-lightbox="animation: slide" uk-grid>
              <div v-for="foto in $auth.user.escort.fotos">
                <a data-type="image" :href="baseUrl + foto.imagen.url">
                  <div class="uk-background-cover gallery-girl-photo" uk-img :data-src="baseUrl + foto.imagen.url">
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import axios from '~/plugins/axios'

export default {
  async asyncData(context) {
    let {
      data
    } = await axios.get('/etiquetas')
    let services = await axios.get('/escortservicios')
    let escort = await axios.get('/escorts/' + context.app.$auth.user.escort.id)
    return {
      tags: data,
      services: services.data,
      escort: escort.data
    }
  },
  computed: {
    finaltags: function() {

      var ftags = []

      for (var i = 0; i < this.tags.length; i++) {

        var mult = ' (Solo Elegir Una Opción)'

        if (this.tags[i].multiple) {
          mult = ' (Puedes elegir más de una opción)'
        }

        ftags.push({
          name: this.tags[i].nombre + mult,
          options: this.tags[i].opciones.split(','),
        })

      }
      return ftags
    }
  },
  components: {
    Multiselect
  },
  data() {
    return {
      value: null,
      includedservices: null,
      extraservices: null,
      options: ['list', 'of', 'options'],
      baseUrl: 'https://api.privadosvip.cl',
      days: [{
          'day': 'Lunes',
          'start': '',
          'end': ''
        },
        {
          'day': 'Martes',
          'start': '',
          'end': ''
        },
        {
          'day': 'Miércoles',
          'start': '',
          'end': ''
        },
        {
          'day': 'Jueves',
          'start': '',
          'end': ''
        },
        {
          'day': 'Viernes',
          'start': '',
          'end': ''
        },
        {
          'day': 'Sábado',
          'start': '',
          'end': ''
        },
        {
          'day': 'Domingo',
          'start': '',
          'end': ''
        }
      ]
    }
  },
  methods:{
    setBasicInformation(){

      axios.put('/escorts/' + this.$auth.user.escort.id,{
          precio: this.escort.precio,
          nacionalidad: this.escort.nacionalidad,
          whatsapp: this.escort.whatsapp,
          altura: this.escort.altura,
          peso: this.escort.peso,
          acerca: this.escort.acerca
      })
      .then(response => {
         console.log('saved')
      })
      .catch(error => {

      })
    },
    setHour(){
      if(this.escort.calendario!=""){
        axios.put('/escorts/' + this.$auth.user.escort.id,{
            calendario: this.escort.calendario,
        })
        .then(response => {
           console.log('calendario: ' + this.escort.calendario)
        })
        .catch(error => {

        })
      }else{
        axios.put('/escorts/' + this.$auth.user.escort.id,{
            calendario: this.days,
        })
        .then(response => {
           console.log('dias: ' +this.days)
        })
        .catch(error => {

        })
      }
    }
  },
  mounted() {

  }
}
</script>
