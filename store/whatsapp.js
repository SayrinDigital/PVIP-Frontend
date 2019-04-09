export const state = () => ({
  message: null
})

export const mutations = {
  setWhatsappMessage(state, whatsapp){
    state.message = whatsapp
  }
}
