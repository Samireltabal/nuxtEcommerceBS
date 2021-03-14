export const state = () => {
  return {
    locales: ['en', 'ar'],
    locale: 'ar'
  }
}

// getters
export const getters = {
}

// mutations
export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
      this.$axios.setHeader('X-localization', locale)
    }
  }
}

// actions
export const actions = {
  SET_LANG (context, locale) {
    if (context.state.locales.includes(locale)) {
      context.commit('SET_LANG', locale)
      this.$axios.setHeader('X-localization', locale)
    }
  }
}
