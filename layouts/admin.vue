<template>
  <v-app>
    <div>
      <v-app-bar
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-app-bar-nav-icon @click="drawer = true" />

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer />

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="changeLocale(locale)"
        >
          {{ locale.name }}
        </v-btn>
        <v-btn icon @click="$router.push('/')">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item to="/admin/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/accounts">
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Accounts</v-list-item-title>
            </v-list-item>
            <v-list-item to="/admin/products">
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Products</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-folder-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Categories</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Orders</v-list-item-title>
            </v-list-item>
            <v-list-item to="/admin/settings">
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        color="#5fcbc4"
        class="text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="white--text mx-4"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider />

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  ssr: false,
  data: () => ({
    drawer: false,
    group: null,
    icons: [
      'mdi-home',
      'mdi-email',
      'mdi-calendar',
      'mdi-delete'
    ]
  }),
  head () {
    return {
      title: 'admin panel',
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
  },
  methods: {
    changeLocale (locale) {
      this.$i18n.locale = locale.code
      this.$router.push(this.switchLocalePath(locale.code))
      if (locale.dir === 'rtl') {
        this.$vuetify.rtl = true
      } else {
        this.$vuetify.rtl = false
      }
    }
  }
}
</script>
