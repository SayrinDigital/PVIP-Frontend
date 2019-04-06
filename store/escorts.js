export const state = () => ({
  escorts: null,
})

export const mutations = {
  setEscorts(state, escorts){
    state.escorts = escorts.sort(function(){return 0.5 - Math.random()})
  }
}

export const getters = {
  items: state => {
    return state.escorts
  },
}
