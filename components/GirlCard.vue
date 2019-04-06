<template>
<div v-show="escort.avatar">
  <nuxt-link :to="{name: 'chica-id', params: { id: escort.id } }" class="girl-card uk-display-block">
    <div v-show="type=='hlgirl'" class="uk-background-cover first-section" :data-src="baseUrl + escort.avatar.url" uk-img>
    </div>
    <div v-show="type=='basicgirl'" class="uk-background-cover basic-section" :data-src="baseUrl + escort.avatar.url" uk-img>
    </div>
    <div class="footer">
      <p><span v-show="escort.user" class="name uk-text-capitalize">{{ escort.user.nombre }}</span><span class="oldy"> {{ escort.nacimiento | getAge }}</span> <br v-show="type=='basicgirl'"> <span v-show="escort.categoria" class="girltype">{{ escort.categoria.nombre }}</span><span v-show="type=='hlgirl'"
          class="description"> ubicada en <span> {{ escort.ubicacion }} </span>. Servicio de 1 hora por</span> <br v-show="type=='basicgirl'"> <span class="price">{{ escort.precio | currency('CLP', 0, { thousandsSeparator: '.' }) }}</span></p>
    </div>
  </nuxt-link>
</div>
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
