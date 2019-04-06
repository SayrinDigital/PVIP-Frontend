<template>
<div>

  <div class="uk-height-viewport uk-flex uk-flex-middle uk-flex-center uk-background-cover" data-src="https://images.unsplash.com/photo-1514091397859-48b5dbf562a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" uk-img>

    <div class="uk-position-bottom-left uk-position-fixed">
      <div class="uk-overlay uk-light go-back">
        <nuxt-link to="/"><span class="uk-margin-small-right" uk-icon="icon: arrow-left; ratio: 2;"></span> Volver</nuxt-link>
      </div>
    </div>

    <section class="uk-section">
      <div class="uk-container tm-container-medium">
        <div class="uk-background-default login-card uk-width-large@m">
          <form v-on:submit.prevent="register" id="login-form" class="uk-form-stacked">

            <div class="uk-margin uk-text-center">
              <img width="200" src="/assets/blacklogo.png" alt="">
            </div>

            <div class="uk-margin">
              <label class="uk-form-label">Soy</label>
              <div class="uk-form-controls">
                <select required v-model="registertype" class="uk-select" id="form-stacked-select">
               <option value="Escort" selected="selected">Escort</option>
               <option value="Cliente">Cliente</option>
               <option value="Negocio">Negocio</option>
           </select>
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label">Usuario</label>
              <div class="uk-form-controls">
                <div class="uk-inline uk-width-1-1">
                  <span class="uk-form-icon" uk-icon="icon: user"></span>
                  <input v-model="username" class="uk-input" type="text" placeholder="">
                </div>
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label">Email</label>
              <div class="uk-form-controls">
                <div class="uk-inline uk-width-1-1">
                  <span class="uk-form-icon" uk-icon="icon: mail"></span>
                  <input v-model="email" class="uk-input" name="" type="email" placeholder="">
                </div>
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label">Nombre</label>
              <div class="uk-form-controls">
                <div class="uk-inline uk-width-1-1">
                  <span class="uk-form-icon" uk-icon="icon: pencil"></span>
                  <input v-model="name" class="uk-input" type="text" placeholder="">
                </div>
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label">Contraseña</label>
              <div class="uk-form-controls">
                <div class="uk-inline uk-width-1-1">
                  <span class="uk-form-icon" uk-icon="icon: lock"></span>
                  <input v-model="password" class="uk-input" type="password" placeholder="Contraseña">
                </div>
              </div>
            </div>



            <div v-if="registertype == 'Escort'" class="uk-margin">
              <label class="uk-form-label">Foto de Perfil</label>
              <div uk-form-custom="target: true">
                <input type="file" @change="uploadImage($event)">
                <input class="uk-input uk-width-1-1" type="text" placeholder="Elige tu foto" disabled>
              </div>
            </div>

            <div class="uk-margin" v-if="errormessage">
              <p class="uk-text-danger uk-text-center">{{ errormessage }}</p>
            </div>

            <div class="uk-margin" v-if="successmessage">
              <p class="uk-text-success uk-text-center">{{ successmessage }}</p>
            </div>

            <div class="uk-margin uk-text-center">
              <button class="uk-button" type="submit"><span v-if="isregistering" class="uk-margin-small-right" uk-spinner></span>Regístrate</button>
            </div>

            <div class="uk-margin uk-text-center">
              <p>¿Ya tienes una cuenta?
                <nuxt-link class="link-hl" to="/login">Inicia sesión aquí</nuxt-link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </section>
  </div>

</div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData({
    params
  }) {
    // We can use async/await ES6 feature
    const roles = await axios.get(
      '/users-permissions/roles', {}
    );

    return {
      roles: roles.data,
    };
  },
  data() {
    return {
      registertype: "",
      username: "",
      email: "",
      password: "",
      name: "",
      escortphoto: null,
      isregistering: false,
      errormessage: null,
      successmessage: null
    }
  },

  layout: 'plain',
  methods: {
    register() {


      if (this.getRole() != null) {

        this.isregistering = true
        this.errormessage = null

        axios.post(
            '/auth/local/register', {
              username: this.username,
              email: this.email,
              password: this.password,
              nombre: this.name
            }
          )
          .then(response => {
            switch (this.registertype) {
              case 'Escort':
                this.createEscort(response.data.user.id)
                break;
              case 'Negocio':
                this.createBusiness(response.data.user.id)
                break;
              case 'Cliente':
                this.createClient(response.data.user.id)
                break;
            }

          })
          .catch(error => {
            this.isregistering = false
            this.errormessage = "Oops! Hubo un error, revisa los datos que ingresaste e intenta nuevamente."
            //console.log(error)
          })
      }


    },
    createEscort(id){
      axios.post(
        '/escorts/', {
          user: id
        }
      )
      .then(response => {
        this.updateRole(id)
          //this.uploadProfilePhoto(id, response.data.id)
      })
      .catch(error => {
        this.isregistering = false
        console.log(error)
      })
    },
    createBusiness(id){
      axios.post(
        '/negocios/', {
          user: id
        }
      )
      .then(response => {
        this.updateRole(id)
          //this.uploadProfilePhoto(id, response.data.id)
      })
      .catch(error => {
        this.isregistering = false
        console.log(error)
      })
    },
    createClient(id){
      axios.post(
        '/clientes/', {
          user: id
        }
      )
      .then(response => {
        this.updateRole(id)
      })
      .catch(error => {
        this.isregistering = false
        console.log(error)
      })
    },
    updateRole(id) {

      var isblocked = false

      switch (this.registertype) {
        case 'Escort':
          isblocked = true
          break;
        case 'Negocio':
          isblocked = true
          break;
        case 'Cliente':
          isblocked = false
          break;
      }


      axios.put(
          '/users/' + id, {
            role: this.getRole(),
            blocked: isblocked,
          }
        )
        .then(response => {
          if (this.registertype == 'Escort') {
            this.uploadProfilePhoto(response.data.escort.id)
          }
          this.isregistering = false
          this.errormessage = null
          if(this.registertype == 'Escort' || this.registertype == 'Negocio'){
            this.successmessage = "Estamos casi listos! Acabamos de recibir tu solicitud, te enviaremos un mensaje al correo que nos dejaste."
          }else{
            this.successmessage = "Gracias por registrarte. Puedes ingresar con tus credenciales ya!"
          }
        })
        .catch(error => {
          this.isregistering = false
          this.errormessage = "Oops! Hubo un error, revisa los datos que ingresaste e intenta nuevamente."
          //console.log(error)
        })

    },
    uploadProfilePhoto(id) {
      let formData = new FormData();
      formData.append('files', this.escortphoto);
      formData.append('refId', id);
      formData.append('ref', 'escort');
      formData.append('field', 'avatar');

      axios.post('/upload',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function() {

        })
        .catch(function() {
          this.isregistering = false
          console.log('ddidn word')
        });
    },
    getRole() {
      var vim = this

      var role = this.roles.roles.filter(function(role) {
        return role.name == vim.registertype;
      });

      return role[0].id
    },
    uploadImage(event) {
      this.escortphoto = event.target.files[0]
    }
  }
}
</script>
