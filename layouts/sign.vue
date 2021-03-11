<template>
  <div class="container">
    <Nuxt />
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
