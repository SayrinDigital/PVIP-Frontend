export const state = () => ({
  categories: null,
})

export const mutations = {
  setCategories(state, categories){
    state.categories = categories
  }
}
