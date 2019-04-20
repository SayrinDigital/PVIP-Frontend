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
                    <div class="avatar uk-background-cover uk-position-relative" uk-img :data-src="baseUrl + escort.avatar.url">
                      <div class="uk-position-bottom-right">
                        <div class="uk-overlay">
                          <div uk-form-custom>
                            <input type="file" @change="uploadProfile($event)">
                            <button class="uk-button basic" type="button" tabindex="-1"> <span v-if="isuploadingprofilephoto" class="uk-margin-small-right" uk-spinner></span> Cambiar</button>
                          </div>
                        </div>
                      </div>
                    </div>
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
                            <div class="uk-grid-collapse uk-flex uk-flex-middle" uk-grid>
                              <div class="uk-width-auto">
                                <img width="20" src="/assets/icons/height.svg" alt="">
                              </div>
                              <div class="uk-width-expand">
                                <input class="uk-input uk-form-blank simple" v-model="escort.altura" placeholder="1.50 cm" type="text">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="card-gray body">
                          <div class="uk-inline">
                            <div class="uk-grid-collapse uk-flex-middle" uk-grid>
                              <div class="uk-width-auto">
                                <img width="20" src="/assets/icons/weight.svg" alt="">
                              </div>
                              <div class="uk-width-expand">
                            <input class="uk-input uk-form-blank simple" v-model="escort.peso" placeholder="86 kg." type="text">
                          </div>
                        </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="uk-margin uk-text-right">
                      <button class="uk-button basic" type="submit">Guardar</button>
                    </div>

                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


            <div class="uk-margin">
              <div class="card-gray hour-picker uk-card uk-card-body">
                <h4 class="light">Datos Extra</h4>
                  <form  v-on:submit.prevent="setExtra()">
                    <div class="uk-child-width-1-2@s" uk-grid>
                      <div >
                        <div>
                          <h5 class="light">Fecha de Nacimiento</h5>
                            <vue-moment-datepicker :language="es" class="datetimeinput" v-model="escort.nacimiento" name="uniquename"></vue-moment-datepicker>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h5 class="light">Teléfono</h5>
                          <input v-model="escort.telefono" class="uk-input" placeholder="5694444444">
                        </div>
                      </div>
                      <div>
                        <div>
                          <h5 class="light">Cuenta Con Estacionamiento</h5>
                          <label><input  class="uk-checkbox" type="checkbox" v-model="escort.conestacionamiento" > <span v-if="escort.conestacionamiento">Con </span> <span v-else>Sin </span> Estacionamiento</label>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h5 class="light">Ubicación</h5>
                          <input v-model="escort.ubicacion" class="uk-input" placeholder="Providencia, Santiago">
                        </div>
                      </div>
                    </div>
                    <div class="uk-margin uk-text-right">
                      <button class="uk-button basic"type="submit">Guardar</button>
                    </div>
                  </form>
              </div>
            </div>

      <div class="uk-margin">
        <div class="card-gray uk-card uk-card-body">
          <h4 class="light">Servicios</h4>
          <div class="uk-margin">
            <h5 class="light">Incluidos</h5>
              <Multiselect :close-on-select="false" v-model="escort.incluidos" trackBy="nombre" :multiple="true" label="nombre" placeholder="Elegir servicios incluidos" :options="services" deselectLabel="Presionar enter para quitar" selectLabel="Presiona enter para elegir"></Multiselect>
          </div>
          <div class="uk-margin">
            <h5 class="light">Adicionales</h5>
              <Multiselect :close-on-select="false" v-model="escort.adicionales" trackBy="nombre" :multiple="true" label="nombre" placeholder="Elegir servicios incluidos" :options="services" deselectLabel="Presionar enter para quitar" selectLabel="Presiona enter para elegir"></Multiselect>
          </div>
          <div class="uk-margin uk-text-right">
            <button class="uk-button basic" @click="setServices()" type="submit">Guardar</button>
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
                <div v-if="escort.calendario.length == 0" class="uk-child-width-1-2@s uk-grid" uk-grid>
                  <div v-for="day in days" :key="day.id">
                    <div class="uk-margin">
                      <p class="hl">{{ day.day }} : </p>
                      <div class="uk-child-width-1-4@s" uk-grid>
                        <div>
                          <label><input  class="uk-checkbox" type="checkbox" v-model="day.atiende" :checked="day.atiende"> Atiende</label>
                        </div>
                        <div>
                          <label v-if="day.atiende"><input  class="uk-checkbox" type="checkbox"  v-model="day.fulltime" :checked="day.fulltime"> Full Time</label>
                        </div>
                        <div>
                          <input v-if="day.atiende" v-bind:class="{  'uk-disabled' : day.fulltime  }" type="text" v-model="day.start" placeholder="09:00" class="uk-input">
                        </div>
                        <div>
                          <input v-if="day.atiende" v-bind:class="{  'uk-disabled' : day.fulltime }" type="text" v-model="day.end" placeholder="22:00" class="uk-input">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="uk-child-width-1-2@s uk-grid">
                    <div v-for="day in escort.calendario" :key="day.id">
                      <p class="hl">{{ day.day }} : </p>
                      <div class="uk-child-width-1-4@s" uk-grid>
                        <div>
                          <label><input class="uk-checkbox" type="checkbox" v-model="day.atiende" :checked="day.atiende"> Atiende</label>
                        </div>
                        <div>
                          <label v-if="day.atiende"><input class="uk-checkbox" type="checkbox"   v-model="day.fulltime" :checked="day.fulltime"> Full Time</label>
                        </div>
                        <div>
                          <input v-if="day.atiende" v-bind:class="{  'uk-disabled' : day.fulltime }" type="text" v-model="day.start" placeholder="09:00" class="uk-input">
                        </div>
                        <div>
                          <input v-if="day.atiende" v-bind:class="{  'uk-disabled' : day.fulltime }" type="text" v-model="day.end" placeholder="22:00" class="uk-input">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="uk-margin uk-text-right">
                <button class="uk-button basic" type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="uk-margin" v-if="finaltags">
        <div class="card-gray uk-card uk-card-body">
          <h4 class="light">Etiquetas</h4>

            <Multiselect :multiple="true" :close-on-select="false" placeholder="Elegir una opción" deselectLabel="Presionar enter para quitar" selectLabel="Presiona enter para elegir" group-values="options" group-label="name" v-model="escort.etiquetas" :options="finaltags"></Multiselect>

          <div class="uk-margin uk-text-right">
            <button class="uk-button basic" @click="setTags()" type="submit">Guardar</button>
          </div>
        </div>
      </div>

      <div class="uk-margin">
        <div class="card-gray uk-card uk-card-body">
          <h4 class="light">Galería</h4>
          <p>Se permite hasta un máximo de 10 fotos.</p>
          <form v-if="escort.fotos.length < 10" v-on:submit.prevent="createPhoto()">
            <div class="uk-margin" uk-margin>
              <div uk-form-custom="target: true">
                <input multiple="true"  type="file" @change="uploadImage($event)">
                <input class="uk-input upload-input uk-form-width-medium" type="text" placeholder="Elegir Fotografías" disabled>
              </div>
              <button class="uk-button basic" type="submit"><span v-if="isuploadinggallery" class="uk-margin-small-right" uk-spinner></span>Subir</button>
            </div>
          </form>
          <div v-if="escort.fotos">
            <div class="uk-child-width-1-4@m uk-child-width-1-2 uk-grid-medium uk-grid" uk-grid>
              <div v-if="foto.imagen" :key="foto.id" v-for="foto in escort.fotos">
                  <div class="uk-background-cover gallery-girl-photo uk-position-relative" uk-img :data-src="baseUrl + foto.imagen.url">
                    <div class="uk-position-bottom-right">
                      <div class="uk-overlay">
                        <a @click="deleteGallery(foto.id)" uk-tooltip="Eliminar" class="uk-icon-button remove-icon" uk-icon="close"></a>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
      <div v-if="$auth.user.negocio" class="uk-container uk-container-small">
        <BusinessPanel :business="escort"></BusinessPanel>
      </div>
  </div>

</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import BusinessPanel from '~/components/Panel/Business'
import axios from '~/plugins/axios'
import {en, es} from 'vue-moment-datepicker/dist/locale'

export default {
  async asyncData(context) {
    let {
      data
    } = await axios.get('/etiquetas')
    let services = await axios.get('/escortservicios')
    let userinfo = null
    if(context.app.$auth.user.escort){
      userinfo = await axios.get('/escorts/' + context.app.$auth.user.escort._id)
    }
    if(context.app.$auth.user.negocio){
      userinfo = await axios.get('/negocios/' + context.app.$auth.user.negocio._id)
    }
    return {
      tags: data,
      services: services.data,
      escort: userinfo.data
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
    Multiselect,
    BusinessPanel
  },
  data() {
    return {
      value: null,
      includedservices: null,
      extraservices: null,
      escortphoto: null,
      profilephoto: null,
      isuploadinggallery: null,
      isuploadingprofilephoto: false,
      es: es,
      baseUrl: 'https://api.privadosvip.cl',
      days: [{
          'day': 'Lunes',
          'start': '',
          'end': '',
          'atiende': true,
          'fulltime': false
        },
        {
          'day': 'Martes',
          'start': '',
          'end': '',
          'atiende': true,
          'fulltime': false
        },
        {
          'day': 'Miércoles',
          'start': '',
          'end': '',
          'atiende': true,
          'fulltime': false
        },
        {
          'day': 'Jueves',
          'start': '',
          'end': '',
          'atiende': true,
          'fulltime': false
        },
        {
          'day': 'Viernes',
          'start': '',
          'end': '',
          'atiende': true,
          'fulltime': false
        },
        {
          'day': 'Sábado',
          'start': '',
          'end': '',
          'atiende': true,
          'fulltime': false
        },
        {
          'day': 'Domingo',
          'start': '',
          'end': '',
          'atiende': true,
          'fulltime': false
        }
      ]
    }
  },
  methods: {
    deleteGallery(id){
      axios.delete('/fotos/' + id)
      .then(response => {
          window.location.reload(true)
      })
      .catch(error => {
          this.$swal("Oh oh!", "Hubo un error al intentar remover la foto.", "error")
      })
    },
    uploadGallery(id, position) {
      let formData = new FormData();
      formData.append('files', this.escortphoto[position]);
      formData.append('refId', id);
      formData.append('ref', 'foto');
      formData.append('field', 'imagen');
      console.log(position)
      console.log(this.escortphoto[position])

      this.isuploadinggallery = true

      //console.log(photo)


      axios.post('/upload',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(response => {
          //window.location.reload(true)
          //this.$swal("En hora buena!", "Tu foto fue subida satisfactoriamente.", "success")
        })
        .catch(error => {
          this.$swal("Oh oh!", "Hubo un error al intentar subir la foto.", "error")
          this.isuploadinggallery = false
          //console.log(error)
        });
    },
    createPhoto() {

      var isuploading = false
      var vm = this

      for(let i=0; i<this.escortphoto.length; i++){

        var photo = this.escortphoto[i]


                     if(i<=this.escortphoto.length){
                       this.$swal("En hora buena!", "Tus fotos fueron subidas satisfactoriamente.", "success")
                       window.location.reload(true)
                     }

           axios.post('/fotos', {
               escort: this.escort.id
             })
             .then(function(response) {
               console.log('created photo')
               vm.uploadGallery(response.data.id, i)
             })
             .catch(function(error)  {

             })

      }
      //window.location.reload(true)
    },
    uploadImage(event) {
      if(event.target.files.length>10){
        this.$swal("Oh oh!", "Solo puedes subir un máximo de 10 fotografías.", "error")
      }else{
              this.escortphoto = event.target.files
      }
    },
    uploadProfile(event) {
      this.profilephoto = event.target.files[0]
      let formData = new FormData();
      formData.append('files', this.profilephoto);
      formData.append('refId', this.escort.id);
      formData.append('ref', 'escort');
      formData.append('field', 'avatar');
      this.isuploadingprofilephoto = true

      axios.post('/upload',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(response => {
          window.location.reload(true)
          //this.$swal("En hora buena!", "Tu foto fue subida satisfactoriamente.", "success")
        })
        .catch(error => {
          this.$swal("Oh oh!", "Hubo un error al intentar subir la foto.", "error")
          //console.log(error)
          this.isuploadingprofilephoto = false
        });
    },
    setExtra(){
      axios.put('/escorts/' + this.$auth.user.escort._id,{
        nacimiento: this.escort.nacimiento,
        telefono: this.escort.telefono,
        conestacionamiento: this.escort.conestacionamiento,
        ubicacion: this.escort.ubicacion
      })
      .then(response => {
        this.$swal("Cambios guardados!", "Tus cambios fueron guardados satisfactoriamente.", "success")
      })
      .catch(error => {
        this.$swal("Oh oh!", "Hubo un error al intentar actualizar la información.", "error")
      })
    },
    setBasicInformation() {

      axios.put('/escorts/' + this.$auth.user.escort._id, {
          precio: this.escort.precio,
          nacionalidad: this.escort.nacionalidad,
          whatsapp: this.escort.whatsapp,
          altura: this.escort.altura,
          peso: this.escort.peso,
          acerca: this.escort.acerca
        })
        .then(response => {
          this.$swal("Cambios guardados!", "Tus cambios fueron guardados satisfactoriamente.", "success")
        })
        .catch(error => {
          this.$swal("Oh oh!", "Hubo un error al intentar actualizar la información.", "error")
        })
    },
    setTags() {
      axios.put('/escorts/' + this.$auth.user.escort._id, {
          etiquetas: this.escort.etiquetas
        })
        .then(response => {
          this.$swal("Cambios guardados!", "Tus cambios fueron guardados satisfactoriamente.", "success")
        })
        .catch(error => {
          this.$swal("Oh oh!", "Hubo un error al intentar actualizar la información.", "error")
        })
    },
    setServices() {
      axios.put('/escorts/' + this.$auth.user.escort._id, {
          incluidos: this.escort.incluidos,
          adicionales: this.escort.adicionales
        })
        .then(response => {
          this.$swal("Cambios guardados!", "Tus cambios fueron guardados satisfactoriamente.", "success")
        })
        .catch(error => {
          this.$swal("Oh oh!", "Hubo un error al intentar actualizar la información.", "error")
        })
    },
    setHour() {
      if (this.escort.calendario != "") {
        axios.put('/escorts/' + this.$auth.user.escort._id, {
            calendario: this.escort.calendario,
          })
          .then(response => {
            this.$swal("Cambios guardados!", "Tus cambios fueron guardados satisfactoriamente.", "success")
          })
          .catch(error => {
            this.$swal("Oh oh!", "Hubo un error al intentar actualizar la información.", "error")
          })
      } else {
        axios.put('/escorts/' + this.$auth.user.escort._id, {
            calendario: this.days,
          })
          .then(response => {
            this.$swal("Cambios guardados!", "Tus cambios fueron guardados satisfactoriamente.", "success")
          })
          .catch(error => {
            this.$swal("Oh oh!", "Hubo un error al intentar actualizar la información.", "error")
          })
      }
    }
  },
  mounted() {

  }
}
</script>
