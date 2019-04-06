<template>

  <div>
    <nuxt-link :to="{name: 'servicios-perfil-id', params: { id:business.id } }" class="service-card uk-display-block">
      <div v-if="business.avatar" class="uk-background-cover first-section" :data-src="baseUrl + business.avatar.url" uk-img>
      </div>
      <div class="footer uk-text-center">
        <h4 class="light" v-if="business.user">{{ business.user.nombre }}</h4>
      </div>
    </nuxt-link>
  </div>

</template>

<script>
export default {
  data(){
    return{
      baseUrl: 'https://api.privadosvip.cl'
    }
  },
  props: ['business']
}
</script>
