import pkg from './package'

export default {
  mode: 'universal',
  server: {
    port: 4600, // default: 3000
  },
  //Transitions
  transition: {
    name: 'basic',
    mode: 'out-in',
      css: false,
      appear: true,
      beforeEnter (el) {
     },
     enter (el, done) {

      var tl = new TimelineLite({  onComplete: done })

      tl.to('.transition-cover', .6, {
        ease: Power2.easeIn,
        startAt: { x: '0%' },
        x: '-100%'
      }, 'begin')

      tl.to('.main-container-content', .6, {
        ease: Power2.easeIn,
        startAt: { opacity: '0' },
        opacity: '1'
      },'begin')

     },
     leave (el, done) {

       var tl = new TimelineLite({  onComplete: done })

       tl.to('.transition-cover', .6, {
         ease: Power2.easeIn,
         startAt: { x: '-100%' },
         x: '0%'
       })

       tl.to('.main-container-content', .6, {
         ease: Power2.easeIn,
         startAt: { opacity: '1' },
         opacity: '0'
       },'begin')

     }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Privados VIP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/assets/preloader.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700|Playfair+Display:400,700' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
    loading: {
      color: '#E9BD2F'
    },

  /*
  ** Global CSS
  */
  css: [
     'vue-multiselect/dist/vue-multiselect.min.css','uikit/dist/css/uikit.css', '@/assets/style.scss','swiper/dist/css/swiper.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      {src: '~/plugins/uikit.js', ssr: false },{src: '~/plugins/swiper.js', ssr: false }, { src: '~/plugins/vue-filters.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
  baseURL: 'https://api.privadosvip.cl'
  // See https://github.com/nuxt-community/axios-module#options
},

auth: {
  // Options
  strategies: {
    local: {
      endpoints: {
        login: { url: '/auth/local', method: 'post', propertyName: 'jwt' },
        register: { url: '/auth/local/register', method: 'post'},
        user: { url: '/users/me', method: 'get', propertyName: null},
        logout: null
      },
       tokenRequired: true,
       tokenType: 'bearer',
    }
  },
  redirect: {
    login: '/',
    logout: '/login'
  }
},

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
