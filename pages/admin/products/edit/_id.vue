<template>
  <b-container fluid>
    <v-alert
      outlined
      dismissible
      :type="alert.type"
      text
      :value="alert.status"
    >
      {{ alert.message }}
    </v-alert>
    <b-row>
      <b-col>
        <b-breadcrumb>
          <b-breadcrumb-item to="/">
            {{ $t('Home') }}
          </b-breadcrumb-item>
          <b-breadcrumb-item to="/admin">
            {{ $t('Admin') }}
          </b-breadcrumb-item>
          <b-breadcrumb-item to="/admin/products">
            {{ $t('Products') }}
          </b-breadcrumb-item>
          <b-breadcrumb-item active>
            {{ product.name }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h3 class="text-left">
          {{ $t('Edit') + ' ' + product.name }}
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="9">
        <b-col>
          <b-form>
            <b-row>
              <b-col>
                <b-form-group
                  id="fieldset-1"
                  description="Product English name"
                  label="English Product name"
                  label-for="product_name_english"
                >
                  <b-form-input id="input-1" v-model="product.translatableFields.name.en" trim />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  id="fieldset-2"
                  description="Product English name"
                  label="Arabic Product name"
                  label-for="product_name_arabic"
                >
                  <b-form-input id="input-2" v-model="product.translatableFields.name.ar" trim />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  id="fieldset-3"
                  description="Product English description"
                  label="English description"
                  label-for="product_description_english"
                >
                  <b-form-textarea id="input-3" v-model="product.translatableFields.description.en" trim rows="4" />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  id="fieldset-1"
                  description="Product Arabic description"
                  label="Arabic Product description"
                  label-for="product_name_description"
                >
                  <b-form-textarea id="input-4" v-model="product.translatableFields.description.ar" trim rows="4" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  id="fieldset-5"
                  description="Product price"
                  label="Product price"
                  label-for="product_price"
                >
                  <b-form-input id="input-5" v-model="product.price" type="number" trim />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  id="fieldset-6"
                  description="Product barcode"
                  label="Product barcode"
                  label-for="product_barcode"
                >
                  <b-form-input id="input-6" v-model="product.barcode" trim />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  id="fieldset-7"
                  label="Category"
                  label-for="product_category"
                >
                  <div>
                    <v-select v-model="product.category_id" :items="categories" />
                  </div>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  id="fieldset-8"
                  label="In stock"
                  label-for="product_stock"
                >
                  <v-checkbox v-model="product.instock" label="is product in stock ?" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  id="fieldset-8"
                  label="Taxable"
                  label-for="product_taxable"
                >
                  <v-checkbox v-model="product.taxable" label="is product taxable ?" />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  id="fieldset-8"
                  label="featured"
                  label-for="product_eatured"
                >
                  <v-checkbox v-model="product.featured" label="is product featured ?" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <v-btn
                  block
                  color="blue"
                  dark
                  :loading="isLoading"
                  x-large
                  @click="submitUpdate"
                >
                  <v-icon>mdi-circle-edit-outline</v-icon><span class="mx-2">Update</span>
                </v-btn>
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-col>
      <b-col>
        <b-row>
          <b-col>
            <h4>Gallery</h4>
            <b-row>
              <b-col cols="10">
                <v-file-input
                  v-model="files"
                  counter
                  multiple
                  show-size
                  small-chips
                  truncate-length="15"
                />
              </b-col>
              <b-col cols="2">
                <v-btn
                  :loading="mediaUploading"
                  :disabled="mediaUploading"
                  color="green"
                  class="ma-2 white--text"
                  fab
                  @click="uploadMedia()"
                >
                  <v-icon dark>
                    mdi-cloud-upload
                  </v-icon>
                </v-btn>
              </b-col>
            </b-row>
            <div v-for="item in product.media" :key="item.id">
              <img :src="item.url" :alt="product.images.name" class="img-thumbnail rounded">
              <v-btn small color="red" dark class="ImageButton" @click="deleteMedia(item.id)">
                <v-icon>mdi-delete</v-icon> -  {{ item.collection_name }}
              </v-btn>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h4>Meta</h4>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <pre>
        {{ formData }}
      </pre>
    </b-row>
  </b-container>
</template>
<script>
export default {
  layout: 'admin',
  ssr: false,
  middleware: 'adminstrator',
  async asyncData ({ $axios, params }) {
    // this.isBusy = true
    const product = await $axios.$get('/products/admin/show/' + params.id)
    const categories = await $axios.$get('/products/admin/list/categories')
    return { product, categories }
  },
  data () {
    return {
      updateProduct: {},
      files: [],
      isLoading: false,
      mediaUploading: false,
      alert: {
        type: 'success',
        message: '',
        status: false
      }
    }
  },
  computed: {
    formData () {
      return {
        product_id: this.product.id,
        name: {
          en: this.product.translatableFields.name.en,
          ar: this.product.translatableFields.name.ar
        },
        description: {
          en: this.product.translatableFields.description.en,
          ar: this.product.translatableFields.description.ar
        },
        category_id: this.product.category_id,
        featured: this.product.featured,
        instock: this.product.instock,
        taxable: this.product.taxable,
        price: this.product.price

      }
    }
  },
  methods: {
    submitUpdate () {
      this.isLoading = true
      this.$axios.post('/products/admin/update', this.formData).then(() => {
        this.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.isLoading = false
      }).catch((err) => {
        this.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.isLoading = false
      })
    },
    uploadMedia () {
      this.mediaUploading = true
      setTimeout(() => {
        this.mediaUploading = false
      }, 5000)
    },
    deleteMedia (id) {
      const form = {
        product_id: this.product.id,
        media_id: id
      }
      this.$axios.delete('/products/admin/product/image', form).then(() => {
        this.alert = {
          type: 'success',
          message: 'media successfully deleted',
          status: true
        }
      }).catch((err) => {
        this.alert = {
          type: 'error',
          message: err.response.data.message,
          status: true
        }
      })
    }
  }
}
</script>
