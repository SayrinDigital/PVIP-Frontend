export const state = () => ({
  business: null,
})

export const mutations = {
  setBusiness(state, business){
    state.business = business
  }
}
