<template>
  <div class="container">
    <div>
      <p>
        {{ settings }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'adminstrator',
  data () {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      settings: {},
      showDismissibleAlert: false
    }
  },
  async fetch () {
    this.settings = await this.$axios.$get('/settings')
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style>
</style>
