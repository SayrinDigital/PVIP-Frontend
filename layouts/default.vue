<template>
  <div>
    <div class="main-container-content">
      <Navigator></Navigator>
      <nuxt />
      <Footer></Footer>
    </div>
    <div class="uk-position-fixed uk-position-top-left transition-cover" uk-height-viewport>

    </div>

      <div class="main-preloader uk-position-fixed uk-position-top-left" uk-height-viewport>
        <img class="img-preloader uk-position-fixed uk-position-center" src="/assets/preloader.png" alt="">
      </div>
  </div>
</template>

<script>

import Navigator from '~/components/Navigator'
import Footer from '~/components/Footer'

export default {
  components: {
     Navigator,
     Footer
  }
}

</script>

<style type="scss">

 .transition-cover{
   background: #222;
   width: 100%;
   z-index: 999997;
 }

 .main-preloader{
   background: #222;
   width: 100%;
    z-index: 999998;
    visibility: collapse;
 }

 .img-preloader{
      opacity: 0;
      z-index: 999999;
 }

 .main-container-content{
   opacity: 0;
 }

</style>
