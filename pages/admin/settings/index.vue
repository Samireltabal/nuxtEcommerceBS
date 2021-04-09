<template>
  <v-row>
    <v-row class="mt-4">
      <v-col>
        <p>{{ $t('lorem') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <h3>{{ $t('used values') }}</h3>
      <v-col>
        <v-alert v-if="show" :type="status">
          {{ message }}
        </v-alert>
        <Setting
          v-for="set in settings.updated"
          :key="set.name"
          :setting="set"
          icon="mdi-update"
          :is-new="false"
          @success="success"
        />
      </v-col>
    </v-row>
    <v-row>
      <h3>{{ $t('defaults') }}</h3>
      <v-col>
        <Setting
          v-for="set in settings.default"
          :key="set.name"
          :setting="set"
          icon="mdi-plus"
          :is-new="true"
          :show="handleExistance(set)"
          @success="success"
        />
      </v-col>
    </v-row>
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
    },
    handleExistance (set) {
      const settings = this.settings.updated
      for (let index = 0; index < settings.length; index++) {
        const setting = settings[index]
        if (setting.name === set.name) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style>
</style>
