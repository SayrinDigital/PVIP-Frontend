<template>
<article :class="[{ 'first-section' : type=='hlgirl', 'medium-section' : type=='mediumgirl', 'basic-section' : type=='basicgirl' }]" class="article-escort" v-if="escort.avatar">
  <nuxt-link :to="{name: 'chica-id', params: { id: escort.id } }" class="girl-card uk-display-block">
    <div class="uk-background-cover bg" :data-src="baseUrl + escort.avatar.url" uk-img>
    </div>
    <div class="footer">
      <p><span v-if="escort.user" class="name uk-text-capitalize">{{ escort.user.nombre }}</span><span class="oldy"> {{ escort.nacimiento | getAge }}</span> <br v-if="type=='basicgirl'"> <span v-if="escort.categoria" class="girltype">{{ escort.categoria.nombre }}</span>
        <span v-if="type=='hlgirl'"class="description"> ubicada en <span> {{ escort.ubicacion }} </span>. Servicio de 1 hora por</span> <span v-if="type=='mediumgirl'"class="description"> ubicada en <span> {{ escort.ubicacion }} </span>. Servicio de 1 hora por</span> <span class="price">{{ escort.precio | currency('CLP ', 0, { thousandsSeparator: '.' }) }}</span></p>
    </div>
  </nuxt-link>
</article>
</template>

<script>
export default {
  props: ['type', 'escort'],
  data() {
    return {
      baseUrl: 'https://api.privadosvip.cl'
    }
  },
  filters: {
    getAge(value) {
      var today = new Date();
      var birthDate = new Date(value);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }
}
</script>
