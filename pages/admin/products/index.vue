<template>
  <v-row>
    <v-row class="mt-4">
      <b-table
        striped
        hover
        :busy.sync="isBusy"
        :items="accounts.data"
        :fields="fields"
      >
        <template #cell(thumb)="data">
          <b-img v-bind="mainProps" rounded alt="Rounded image" :src="data.item.images.thumbnail" />
        </template>
        <template #cell(name)="data">
          {{ data.item.name }}
        </template>
        <template #cell(address)="data">
          {{ !data.item.address ? 'not set' : data.item.address.country + ' ,' + data.item.address.state + ' ,' + data.item.address.city + ', ' + data.item.address.line_1 }}
        </template>
      </b-table>
      <v-row>
        <v-col>
          <b-pagination
            v-model="currentPage"
            :total-rows="accounts.total"
            :per-page="accounts.per_page"
            aria-controls="my-table"
          />
        </v-col>
        <v-col>
          {{ $t('results per page') }} :
        </v-col>
        <v-col>
          <b-form>
            <b-form-select v-model="perPage" :options="options" class="form form-control" />
          </b-form>
        </v-col>
      </v-row>
    </v-row>
  </v-row>
</template>

<script>
// import Setting from '@/components/admin/settings/setting'
export default {
  components: {
    // Setting
  },
  layout: 'admin',
  middleware: 'adminstrator',
  data () {
    return {
      dismissSecs: 10,
      isBusy: false,
      mainProps: { width: 75, height: 75, class: 'm1' },
      options: [
        { value: 10, text: '10' },
        { value: 20, text: '20' },
        { value: 50, text: '50' },
        { value: 100, text: '100' }
      ],
      fields: [
        {
          key: 'id',
          label: this.$t('ID')
        },
        {
          key: 'thumb',
          label: this.$t('Thumbnail'),
          sortable: false
        },
        {
          key: 'name',
          label: this.$t('Full Name'),
          sortable: false
        },
        {
          key: 'email',
          label: this.$t('Email'),
          sortable: false
        },
        {
          key: 'phone_number',
          label: this.$t('Phone'),
          sortable: false
        },
        {
          key: 'role',
          label: this.$t('role'),
          sortable: false
        },
        {
          key: 'address',
          label: this.$t('address'),
          sortable: false
        }
      ],
      dismissCountDown: 0,
      accounts: {},
      message: '',
      status: '',
      show: false,
      showDismissibleAlert: false
    }
  },
  async fetch () {
    this.isBusy = true
    this.accounts = await this.$axios.$get('/products?page=' + this.currentPage + '&count=' + this.perPage).finally(() => {
      this.isBusy = false
    })
  },
  computed: {
    perPage: {
      get () {
        if (this.$route.query.per_page != null) {
          return this.$route.query.per_page
        } else {
          return 10
        }
      },
      // setter
      set (newValue) {
        this.$router.push({ query: { page: this.currentPage, per_page: newValue } })
      }
    },
    currentPage: {
      // getter
      get () {
        if (this.$route.query.page != null) {
          return this.$route.query.page
        } else {
          return 1
        }
      },
      // setter
      set (newValue) {
        this.$router.push({ query: { page: newValue, per_page: this.perPage } })
      }
    },
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  watch: {
    currentPage () {
      this.$fetch()
    },
    perPage () {
      this.$fetch()
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
