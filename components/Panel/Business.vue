<template>

    <div>
        <div class="uk-margin">
          <div class="card-gray uk-card uk-card-body">
            <h4 class="light">Configuración</h4>
            <p>Haz click en cualquier item para editarlo.</p>
            <div class="uk-margin">
            <div class="profile-information">
              <div class="uk-flex uk-flex-middle uk-grid-match" uk-grid>
                <div v-if="business.avatar" class="uk-width-2-5@m">
                  <div>
                    <div class="avatar uk-background-cover uk-position-relative" uk-img :data-src="baseUrl + business.avatar.url">
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
                <div v-if="business" class="uk-width-3-5@m about-girl">
                  <form class="content" v-on:submit.prevent="setBasicInformation()">
                    <div class="uk-margin">
                      <h1 class="light uk-text-capitalize">{{ business.user.nombre }}</h1>
                      <!--<input type="text" v-model="business.user.nombre" placeholder="Nombre" class="uk-input title uk-form-blank">-->
                    </div>

                    <p class="tag-title uk-margin-remove">Sobre Mi</p>
                    <div>
                      <textarea class="uk-textarea uk-form-blank desc" v-model="business.descripcion" placeholder="Presentate" rows="6"></textarea>
                    </div>

                    <div class="uk-child-width-1-2@s uk-grid-small uk-text-center uk-margin" uk-grid>
                      <div>
                        <div class="card-gray body">
                          <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: location"></span>
                            <input class="uk-input uk-form-blank simple" v-model="business.direccion" placeholder="Ubicación" type="text">
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="card-gray body">
                          <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: world"></span>
                            <input class="uk-input uk-form-blank simple" v-model="business.web" placeholder="www." type="text">
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
        <div class="card-gray uk-card uk-card-body">
          <h4 class="light">Galería</h4>
          <p>Se permite hasta un máximo de 10 fotos.</p>
          <form v-if="business.fotos.length < 10" v-on:submit.prevent="createPhoto()">
            <div class="uk-margin" uk-margin>
              <div uk-form-custom="target: true">
                <input multiple="true"  type="file" @change="uploadImage($event)">
                <input class="uk-input upload-input uk-form-width-medium" type="text" placeholder="Elegir Fotografías" disabled>
              </div>
              <button class="uk-button basic" type="submit"><span v-if="isuploadinggallery" class="uk-margin-small-right" uk-spinner></span>Subir</button>
            </div>
          </form>
          <div v-if="business.fotos">
            <div class="uk-child-width-1-4@m uk-child-width-1-2 uk-grid-medium uk-grid" uk-grid>
              <div v-if="foto.imagen" :key="foto.id" v-for="foto in business.fotos">
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

</template>

<script>

  import axios from '~/plugins/axios'

 export default{

   data(){
     return{
       isuploadingprofilephoto: false,
       isuploadinggallery: false,
       escortphoto: null,
       baseUrl: 'https://api.privadosvip.cl',
       profilephoto: null
     }
   },
   props: ['business'],
   methods: {
     uploadProfile(event){

       this.profilephoto = event.target.files[0]
       let formData = new FormData();
      formData.append('files', this.profilephoto);
      formData.append('refId', this.business.id);
      formData.append('ref', 'negocio');
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
     setBasicInformation(){
        
        axios.put('/negocios/' + this.$auth.user.negocio._id ,{
          descripcion: this.business.descripcion,
          direccion: this.business.direccion,
          web: this.business.web
        })
        .then(response => {
            this.$swal("Cambios guardados!", "Tus cambios fueron guardados satisfactoriamente.", "success")
        })
        .catch(error => {
            this.$swal("Oh oh!", "Hubo un error al intentar actualizar la información.", "error")
        })

     },
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
     createPhoto(){
        var isuploading = false
        var vm = this

      for(let i=0; i<this.escortphoto.length; i++){

        var photo = this.escortphoto[i]


                     if(i<=this.escortphoto.length){
                       this.$swal("En hora buena!", "Tus fotos fueron subidas satisfactoriamente.", "success")
                       window.location.reload(true)
                     }

           axios.post('/fotos', {
               negocio: this.business.id
             })
             .then(function(response) {
               console.log('created photo')
               vm.uploadGallery(response.data.id, i)
             })
             .catch(function(error)  {

             })

      }
     },
     uploadImage(event) {
       if(event.target.files.length>10){
        this.$swal("Oh oh!", "Solo puedes subir un máximo de 10 fotografías.", "error")
      }else{
              this.escortphoto = event.target.files
      }
     }
   }

 }

</script>