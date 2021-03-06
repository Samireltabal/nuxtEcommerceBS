<template>
  <div>
    <navBar />
    <div class="container-fluid">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import navBar from '@/components/Main/navBar'
export default {
  components: {
    navBar
  },
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
