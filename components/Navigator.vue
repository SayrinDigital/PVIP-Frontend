<template>
<div>
  <nav id="smallnav" class="uk-navbar-container uk-navbar-transparent pv-background-dark " uk-navbar>
    <div class="uk-navbar-right">
      <div class="uk-navbar-item">
        <ul class="uk-iconnav">
          <li><a href="#" uk-icon="icon: facebook"></a></li>
          <li><a href="#" uk-icon="icon: instagram"></a></li>
        </ul>
      </div>
      <div v-if="!$auth.loggedIn" class="uk-navbar-item uk-hidden@s">
        <nuxt-link to="/registro" class="light"> <span class="uk-icon uk-margin-small-right" uk-icon="icon: user"></span> Regístrate</nuxt-link>
      </div>
      <div v-if="!$auth.loggedIn" class="uk-navbar-item">
        <nuxt-link class="light" to="/login"> <span class="uk-icon uk-margin-small-right" uk-icon="icon: sign-in"></span> Iniciar Sesión</nuxt-link>
      </div>
      <div v-if="$auth.loggedIn" class="uk-hidden@s">
        <a class="user-button uk-text-capitalize"><span class="uk-icon uk-margin-small-right" uk-icon="icon: user"></span> {{ $auth.user.nombre }}</a>
        <div uk-dropdown>
          <ul class="uk-nav uk-dropdown-nav">
            <li><nuxt-link to="/perfil"><span class="uk-margin-small-right" uk-icon="settings"></span> Modificar Perfil</nuxt-link></li>
            <li><a @click="$auth.logout()"><span class="uk-margin-small-right" uk-icon="sign-out"></span> Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
      <div class="uk-navbar-item">
        <nuxt-link to="/anunciate" class="ad-hl-esc">Anúnciate</nuxt-link>
      </div>
    </div>
  </nav>
  <div uk-sticky="animation: uk-animation-slide-top; cls-active: uk-navbar-sticky; top: 200">
    <nav id="mainnav" class="uk-navbar-container uk-navbar-transparent pv-background-default" uk-navbar>
      <!--<div class="uk-navbar-left">
        <div class="uk-navbar-item">
          <nuxt-link to="/"><img width="170" src="/assets/whitelogo.png" alt=""></nuxt-link>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item uk-visible@s">
          <div v-if="$auth.loggedIn">
            <a class="user-button  uk-text-capitalize"><span class="uk-icon uk-margin-small-right" uk-icon="icon: user"></span> {{ $auth.user.nombre }}</a>
            <div uk-dropdown>
              <ul class="uk-nav uk-dropdown-nav">
                <li><nuxt-link to="/perfil"><span class="uk-margin-small-right" uk-icon="settings"></span> Modificar Perfil</nuxt-link></li>
                <li><a @click="$auth.logout()"><span class="uk-margin-small-right" uk-icon="sign-out"></span> Cerrar Sesión</a></li>
              </ul>
            </div>
          </div>
          <nuxt-link to="/registro" v-else class="register-button"><span class="uk-icon uk-margin-small-right" uk-icon="icon: user"></span> Regístrate</nuxt-link>
        </div>
        <div class="uk-navbar-item">
          <a class="hamburguer-menu" @click="toggleMenu">
            <div></div>
            <div></div>
            <div></div>
          </a>
        </div>
      </div>-->
    </nav>
  </div>

  <div class="modal-menu-left">

    <div class="uk-position-top-right">
      <div class="uk-overlay">
        <button type="button" @click="toggleMenu()" uk-close></button>
      </div>
    </div>


    <div class="uk-flex uk-flex-middle uk-flex-center" uk-height-viewport>
      <ul class="main-nav uk-list" uk-nav>
        <li class="nav-item">
          <nuxt-link to="/">Inicio</nuxt-link>
        </li>
        <li class="nav-item uk-parent">
          <a>Categorías <span class="uk-icon uk-margin-small-left" uk-icon="icon: chevron-right"></span></a>
          <ul class="uk-nav-sub">
            <li>
                <nuxt-link v-for="category in categories" :key="category.id" :to="{name: 'categorias-id', params: { id:category.id } }">{{ category.nombre }}</nuxt-link>
            </li>
          </ul>
        </li>
        <li class="nav-item  uk-parent">
          <a>Servicios <span class="uk-icon uk-margin-small-left" uk-icon="icon: chevron-right"></span></a>
          <ul class="uk-nav-sub">
            <li>
              <nuxt-link v-for="service in services" :key="service.id" :to="{name: 'servicios-categoria-id', params: { id: service.id } }">{{ service.nombre }}</nuxt-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <nuxt-link to="/anunciate">Anúnciate</nuxt-link>
        </li>
      </ul>
    </div>

  </div>

</div>
</template>

<script>
import {
  TimelineLite,
  Back
} from 'gsap'
import {mapState} from 'vuex'

export default {
  data() {
    return {
      isopen: false,
      tl: null
    }
  },
  watch: {
    '$route.path': function() {
      if (this.isopen) {
        this.toggleMenu()
      }
    }
  },
  computed: {
  ...mapState({
    categories: state => state.categories.categories,
    services: state => state.services.services,
    escorts: state => state.escorts.escorts,
  })
},
  mounted() {
    this.loadAnimation()
  },
  methods: {
    loadAnimation() {
      this.tl = new TimelineLite({
        paused: true
      })
      this.tl.to('.modal-menu-left', .8, {
        ease: Power4.easeOut,
        transformOrigin: '0% 50%',
        startAt: {
          x: '-100%',
          visibility: 'hidden'
        },
        x: '0%',
        visibility: 'visible'
      }, 'begin')

      const children = this.$el.querySelectorAll('.nav-item');
      for (var i = 0; i < children.length; i++) {
        this.tl.to(children[i], .8, {
          ease: Power4.easeOut,
          startAt: {
            x: '-20%',
            opacity: 0
          },
          x: '0%',
          opacity: 1,
        }, 'begin+=' + (.5 + i * 0.1))
      }

    },
    toggleMenu() {
      if (!this.isopen) {
        this.tl.play().timeScale(1)
        this.isopen = true
      } else {
        this.tl.reverse().timeScale(2)
        this.isopen = false

      }
    },
  }
}
</script>

<style scoped>



</style>
