<template>
  <div class="container">
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="6">
        <Nuxt />
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  head () {
    return {
      title: 'awesome title',
      htmlAttrs: {
        lang: this.currentLocale,
        dir: this.direction
      }
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    currentLocale () {
      return this.$i18n.locale
    },
    direction () {
      if (this.currentLocale === 'ar') {
        return 'rtl'
      } else {
        return 'ltr'
      }
    }
  }
}
</script>
<style>

</style>
