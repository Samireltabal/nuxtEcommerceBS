<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        {{ $t('welcome') }} Profile
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
        <nuxt-link
          to="/"
          rel="noopener noreferrer"
          class="button--grey"
        >
          Home
        </nuxt-link>
        <nuxt-link
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
        >
          {{ locale.name }}
        </nuxt-link>
      </div>
      <b-alert show>
        Default Alert
      </b-alert>

      <b-alert variant="success" show>
        Success Alert
      </b-alert>

      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        Dismissible Alert!
      </b-alert>

      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="warning"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
        <b-progress
          variant="warning"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        />
      </b-alert>

      <b-button variant="info" class="m-1" @click="showAlert">
        Show alert with count-down timer
      </b-button>
      <b-button variant="info" class="m-1" @click="showDismissibleAlert=true">
        Show dismissible alert ({{ showDismissibleAlert ? 'visible' : 'hidden' }})
      </b-button>
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
      showDismissibleAlert: false
    }
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
