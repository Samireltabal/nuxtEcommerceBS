<template>
  <div>
    <browserNav :langs="availableLocales" />
  </div>
</template>
<script>
import browserNav from '@/components/Main/Navigation/browserNav'
export default {
  components: {
    browserNav
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    currentLocale () {
      return this.$i18n.locale
    }
  }
}
</script>
