import axios from '~/plugins/axios'


export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
      const {data}  = await axios.get('/categorias')
      const services  = await axios.get('/servicios')
      const escorts  = await axios.get('/escorts')
      const business  = await axios.get('/negocios')

      commit('categories/setCategories', data)
      commit('services/setServices', services.data)
      commit('escorts/setEscorts', escorts.data)
      commit('business/setBusiness', business.data)
  }
}
