export const state = () => ({
  services: null,
})

export const mutations = {
  setServices(state, services){
    state.services = services
  }
}
