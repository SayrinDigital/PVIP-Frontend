import axios from '~/plugins/axios'


export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
      const {data}  = await axios.get('/categorias')
      const services  = await axios.get('/servicios')
      const escorts  = await axios.get('/escorts')
      const business  = await axios.get('/negocios')
      const socials  = await axios.get('/socials')
      const ads  = await axios.get('/tipoanuncios')
      const whatsapp = await axios.get('/whatsapps')
      const tips = await axios.get('/consejos')

      commit('categories/setCategories', data)
      commit('services/setServices', services.data)
      commit('escorts/setEscorts', escorts.data)
      commit('socials/setSocials', socials.data)
      commit('adstype/setAds', ads.data)
      commit('whatsapp/setWhatsappMessage', whatsapp.data)
      commit('tips/setTips', tips.data)
  }
}
