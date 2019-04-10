export const state = () => ({
  tips: [],
})

export const mutations = {
  setTips(state, tips){
    state.tips = tips
  }
}
