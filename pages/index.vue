<template>
<div>
  <Searcher :tags="finaltags"  @filtered="filterthis"></Searcher>
  <div class="uk-section">
    <div class="uk-container tm-container-medium" >
      <!--<div class="uk-child-width-1-4@m uk-child-width-1-2 uk-grid-small  uk-grid" uk-grid="masonry: true">
        <GirlCard type="hlgirl" :escort="escort"  v-for="escort in firsthalf" :key="escort.id"></GirlCard>
      </div>--->
      <!--<div class="uk-child-width-1-8@m uk-child-width-1-3 uk-grid-small  uk-grid" uk-grid>
        <GirlCard type="basicgirl" :escort="escort"  v-for="escort in secondhalf" :key="escort.id"></GirlCard>
      </div>-->
      <div v-if="hasbeenfiltered">
        <div class="main-grid">
          <GirlCard v-if="!escort.user.blocked" type="hlgirl" :escort="escort" v-for="escort in filteredescort" :key="escort.id"></GirlCard>
        </div>
      </div>
      <div v-else class="main-grid">
        <GirlCard v-if="!escort.user.blocked" type="hlgirl" :escort="escort" v-for="escort in firsthalf" :key="escort.id"></GirlCard>
        <GirlCard v-if="!escort.user.blocked" type="mediumgirl" :escort="escort" v-for="escort in secondhalf" :key="escort.id"></GirlCard>
        <GirlCard v-if="!escort.user.blocked" type="basicgirl" :escort="escort" v-for="escort in thirdhalf" :key="escort.id"></GirlCard>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Searcher from '~/components/Home/Searcher'
import GirlCard from '~/components/GirlCard'
import axios from '~/plugins/axios'
export default {
   async asyncData(context) {
    let {data} = await axios.get('/etiquetas')
    return {
      tags: data,
    }
  },
  data(){
    return{
      tl: null,
      filteredescort: null,
      hasbeenfiltered: false
    }
  },
  created(){

  },
  computed: {
    finaltags: function() {

      var ftags = []

      for (var i = 0; i < this.tags.length; i++) {

        var mult = ' '

        if (this.tags[i].multiple) {
          mult = ' '
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
    },
    escorts() {
      return this.$store.getters['escorts/items']
   },
   firsthalf(){
     var esc = this.escorts
     let halfWayThough = Math.floor(esc.length / 3)
     return esc.slice(0, halfWayThough+1)
   },
   secondhalf(){
     var esc = this.escorts
     let halfWayThough = Math.floor(esc.length / 3)
     return esc.slice(halfWayThough+1, halfWayThough*2)
   },
   thirdhalf(){
     var esc = this.escorts
     let halfWayThough = Math.floor(esc.length / 3)
     return esc.slice(halfWayThough*2, esc.length)
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
    filterthis (value) {
      //this.filteredescort = this.escorts

      if(!value){
        this.hasbeenfiltered = false
      }else{
        this.hasbeenfiltered = true

      var tofilterescorts = this.escorts
      var filter = tofilterescorts.filter((escort, index, array ) => {
        return value.every(i => escort.etiquetas.includes(i))
      })

      this.filteredescort = filter
      }

      console.log(filter) // someValue
    },
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
