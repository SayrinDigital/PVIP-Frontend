<template>

  <div class="uk-flex uk-flex-center uk-flex-middle uk-background-cover" uk-height-viewport uk-img data-src="https://images.unsplash.com/photo-1526404746352-668ded9b50ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
      <div class="uk-position-cover" style="background: rgba(0,0,0,0.7);"></div>
    <div class="uk-position-bottom-left" style="z-index: 2">
      <div class="uk-overlay uk-light go-back">
        <nuxt-link to="/"><span class="uk-margin-small-right" uk-icon="icon: arrow-left; ratio: 2;"></span> Volver</nuxt-link>
      </div>
    </div>

   <section class="uk-section" style="z-index: 2">
     <div class="uk-container tm-container-medium">
       <div class="uk-background-default login-card uk-width-large@m">
         <form v-on:submit.prevent="login" id="login-form" class="uk-form-stacked">

           <div class="uk-margin uk-text-center">
             <img width="200" src="/assets/blacklogo.png" alt="">
           </div>

        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Usuario o Email</label>
            <div class="uk-form-controls">
              <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: user"></span>
                <input class="uk-input" v-model="identifier" type="text" placeholder="">
              </div>
            </div>
        </div>

        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Contraseña</label>
            <div class="uk-form-controls">
              <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: lock"></span>
                  <input class="uk-input" v-model="password" type="password" placeholder="Contraseña">
              </div>
            </div>
        </div>

        <div class="uk-margin uk-text-center">
          <button class="uk-button" type="submit">Iniciar Sesión</button>
        </div>

        <div class="uk-margin uk-text-center">
          <p>¿No tienes una cuenta? <nuxt-link class="link-hl" to="/registro">Registrate aquí</nuxt-link> </p>
        </div>


    </form>
       </div>
     </div>
   </section>

  </div>

</template>

<script>
export default {
  layout: 'plain',
  data(){
    return{
      identifier: "",
      password: ""
    }
  },
  methods: {
    login(){
      this.$auth.loginWith('local', {
         data: {
           identifier: this.identifier,
           password: this.password
         }
       })
    }
  }
}
</script>
