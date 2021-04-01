<template>
  <v-row>
    <v-col>
      <v-alert v-if="show" :type="status">
        {{ message }}
      </v-alert>
      <Setting v-for="set in settings" :key="set.name" :setting="set" @success="success" />
    </v-col>
  </v-row>
</template>

<script>
import Setting from '@/components/admin/settings/setting'
export default {
  components: {
    Setting
  },
  layout: 'admin',
  middleware: 'adminstrator',
  data () {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      settings: {},
      message: '',
      status: '',
      show: false,
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
    success (message, status) {
      this.message = message
      this.status = status
      this.show = true
      setTimeout(() => {
        this.show = false
        this.$fetch()
      }, 5000)
    }
  }
}
</script>

<style>
</style>
