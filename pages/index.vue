<template>
<div>
  <Searcher></Searcher>
  <div class="uk-section">
    <div class="uk-container tm-container-medium">
      <div class="uk-child-width-1-4@m uk-child-width-1-2 uk-grid-small  uk-grid" uk-grid>
        <GirlCard type="hlgirl" :escort="escort"  v-for="escort in firsthalf" :key="escort.id"></GirlCard>
      </div>
      <div class="uk-child-width-1-6@m uk-child-width-1-3 uk-grid-small  uk-grid" uk-grid>
        <GirlCard type="basicgirl" :escort="escort"  v-for="escort in secondhalf" :key="escort.id"></GirlCard>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Searcher from '~/components/Home/Searcher'
import GirlCard from '~/components/GirlCard'
import {mapState} from 'vuex'

export default {
  data(){
    return{
      tl: null,
    }
  },
  created(){

  },
  computed: {
    escorts() {
      return this.$store.getters['escorts/items']
   },
   firsthalf(){
     var esc = this.escorts
     let halfWayThough = Math.floor(esc.length / 2)
     return esc.slice(0, halfWayThough)
   },
   secondhalf(){
     var esc = this.escorts
     let halfWayThough = Math.floor(esc.length / 2)
     return esc.slice(halfWayThough, esc.length)
   }
  },

  components: {
    Searcher,
    GirlCard
  },
  mounted(){

    window.onNuxtReady((app) => {
      this.loadingScreen()
    })

  },
  transition: 'basic',
  methods: {
     loadingScreen(){
       var tl = new TimelineLite()

       tl.to('.main-preloader', 2.1,  {
         ease: Power2.easeIn,
         startAt: {  visibility: 'visible' },
       }, 'begin')

       tl.to('.img-preloader', .8, {
         ease: Power2.easeOut,
         startAt: { scale: .8, opacity: 1, visibility: 'visible'},
         scale: 1,
         repeat: 3,
       }, 'begin')


       tl.to('.main-container-content', .6, {
         ease: Power2.easeIn,
         startAt: { opacity: '0' },
         opacity: '1'
       },'begin+=2')

       tl.to('.img-preloader', .4, {
         startAt: { scale: .8, opacity: 1 },
         scale: 0,
         opacity: 0
       }, 'begin+=2.1')

       tl.to('.img-preloader', .3, {
         visibility: 'collapse'
       }, 'begin+=2.2')

           tl.to('.main-preloader', .4,  {
             ease: Power2.easeIn,
             startAt: { x: '0%', visibility: 'visible' },
             x: '-100%'
           }, 'begin+=2.1')
     }
  },

}
</script>
