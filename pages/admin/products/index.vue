<template>
  <v-row>
    <v-row class="mx-2" align="start">
      <v-col>
        <v-btn
          class="ml-2"
          dark
          color="indigo"
          @click="$router.push('/admin/products/new')"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
          New Product
        </v-btn>
      </v-col>
    </v-row>
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
        <template #cell(price)="data">
          <span
            :class="data.item.OnSale ? 'font-weight-light text-danger' : ''"
            :style="data.item.OnSale ? 'text-decoration: line-through' : ''"
          >
            {{ data.item.price }} SAR
          </span>
          <span :class="data.item.OnSale ? 'font-weight-bold text-success' : ''">
            {{ data.item.OnSale ? ' - ' + data.item.SalePrice + ' SAR' : '' }}
          </span>
        </template>
        <template #cell(name)="data">
          {{ data.item.name }}
        </template>
        <template #cell(barcode)="data">
          <b-button
            id="show-btn"
            v-b-tooltip.hover
            :variant="!data.item.OnSale ? 'outline-success' : 'outline-danger'"
            size="sm"
            :title="!data.item.OnSale ? 'add sale' : 'remove sale'"
            @click="data.item.OnSale ? deleteSale(data.item.sale_id) : $bvModal.show('sale-' + data.item.id) ; saleForm.product_id = data.item.id"
          >
            <v-icon v-if="!data.item.OnSale">
              mdi-currency-usd
            </v-icon>
            <v-icon v-else>
              mdi-currency-usd-off
            </v-icon>
          </b-button>
          <b-button
            id="show-btn"
            v-b-tooltip.hover
            variant="outline-danger"
            size="sm"
            title="Delete Product"
            @click="deleteProduct(data.item.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </b-button>
          <b-button
            id="show-btn"
            v-b-tooltip.hover
            variant="outline-warning"
            size="sm"
            title="Edit Product"
            @click="$router.push('/admin/products/edit/' + data.item.id)"
          >
            <v-icon>mdi-circle-edit-outline</v-icon>
          </b-button>
          <b-button
            id="show-btn"
            v-b-tooltip.hover
            variant="outline-info"
            size="sm"
            title="Show Barcode"
            @click="$bvModal.show('bv-modal-' + data.item.id)"
          >
            <v-icon>mdi-barcode</v-icon>
          </b-button>
          <b-modal :id="'sale-' + data.item.id" hide-footer>
            <template #modal-title>
              {{ $t('Add Sale') }} For {{ data.item.name }}
            </template>
            <div class="d-block text-center">
              <label for="example-datepicker">Choose a date</label>
              <b-form-datepicker id="start_at-datepicker" v-model="saleForm.start_at" class="mb-2" />
              <b-form-datepicker id="end_at-datepicker" v-model="saleForm.expire_at" class="mb-2" />
              <b-form-checkbox
                id="sale-checkbox"
                v-model="saleForm.fixed"
                name="sale-checkbox-1"
                :value="true"
                :unchecked-value="false"
              >
                Fixed Rate
              </b-form-checkbox>
              <b-form-input v-model="saleForm.value" type="number" placeholder="Enter value" />
              <v-btn
                depressed
                elevation="2"
                outlined
                block
                :loading="saleButtonLoading"
                color="success"
                class="mt-2"
                plain
                raised
                @click="submitSale()"
              >
                Submit
              </v-btn>
            </div>
          </b-modal>
          <b-modal :id="'bv-modal-' + data.item.id" hide-footer>
            <template #modal-title>
              {{ $t('Barcode') }}
            </template>
            <div class="d-block text-center">
              <barcode :value="data.item.barcode" :text="data.item.name + ' - ' + data.item.price + $t('SAR')" font-size="10" width="1" height="40">
                Show this if the rendering fails.
              </barcode>
            </div>
          </b-modal>
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
import VueBarcode from 'vue-barcode'
export default {
  components: {
    barcode: VueBarcode
  },
  layout: 'admin',
  middleware: 'adminstrator',
  data () {
    return {
      dismissSecs: 10,
      isBusy: false,
      saleButtonLoading: false,
      saleForm: {
        expire_at: '',
        start_at: '',
        fixed: false,
        product_id: '',
        value: 0
      },
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
          key: 'price',
          label: this.$t('Price'),
          sortable: false
        },
        {
          key: 'category.name',
          label: this.$t('Category'),
          sortable: false
        },
        {
          key: 'barcode',
          label: this.$t('Options'),
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
    submitSale () {
      this.saleButtonLoading = true
      this.$axios.post('/sale/create', this.saleForm).then((response) => {
        this.$swal.fire(
          '',
          response.data.message,
          'success'
        )
        this.$bvModal.hide('sale-' + this.saleForm.product_id)
        this.$fetch()
        this.saleButtonLoading = false
      }).catch((err) => {
        this.$swal.fire(
          '',
          err.response.data.message,
          'error'
        )
        this.saleButtonLoading = false
      })
    },
    deleteProduct (id) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: this.$t('Are you sure?'),
        text: this.$t("You won't be able to revert this!"),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: this.$t('cancel'),
        confirmButtonText: this.$t('Yes, delete it!')
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.get(`/products/delete/${id}`).then(() => {
            swalWithBootstrapButtons.fire(
              this.$t('Deleted!'),
              this.$t('record has been deleted.'),
              'success'
            )
            this.$fetch()
          }).catch((err) => {
            swalWithBootstrapButtons.fire(
              this.$t('something went wrong'),
              err.response.data.message,
              'error'
            )
          })
        }
      })
    },
    deleteSale (id) {
      this.$swal.fire({
        title: this.$t('Are you sure?'),
        text: this.$t("You won't be able to revert this!"),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: this.$t('cancel'),
        confirmButtonText: this.$t('Yes, delete it!')
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.post('/sale/delete', { sale_id: id }).then(() => {
            this.$swal.fire(
              this.$t('Deleted!'),
              this.$t('sale has been deleted.'),
              'success'
            )
            this.$fetch()
          }).catch((err) => {
            this.$swal.fire(
              this.$t('something went wrong'),
              err.response.data.message,
              'error'
            )
          })
        }
      })
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
