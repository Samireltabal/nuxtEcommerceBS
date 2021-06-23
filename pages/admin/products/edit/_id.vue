<template>
  <b-container fluid>
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
      <v-col>
        <b-form>
          <v-row>
            <v-col>
              <b-form-group
                id="fieldset-1"
                description="Product English name"
                label="English Product name"
                label-for="product_name_english"
              >
                <b-form-input id="input-1" v-model="product.translatableFields.name.en" trim />
              </b-form-group>
            </v-col>
            <v-col>
              <b-form-group
                id="fieldset-2"
                description="Product English name"
                label="Arabic Product name"
                label-for="product_name_arabic"
              >
                <b-form-input id="input-2" v-model="product.translatableFields.name.ar" trim />
              </b-form-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <b-form-group
                id="fieldset-3"
                description="Product English description"
                label="English description"
                label-for="product_description_english"
              >
                <b-form-textarea id="input-3" v-model="product.translatableFields.description.en" trim rows="4" />
              </b-form-group>
            </v-col>
            <v-col>
              <b-form-group
                id="fieldset-1"
                description="Product Arabic description"
                label="Arabic Product description"
                label-for="product_name_description"
              >
                <b-form-textarea id="input-4" v-model="product.translatableFields.description.ar" trim rows="4" />
              </b-form-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <b-form-group
                id="fieldset-5"
                description="Product price"
                label="Product price"
                label-for="product_price"
              >
                <b-form-input id="input-5" v-model="product.price" type="number" trim />
              </b-form-group>
            </v-col>
            <v-col>
              <b-form-group
                id="fieldset-6"
                description="Product barcode"
                label="Product barcode"
                label-for="product_barcode"
              >
                <b-form-input id="input-6" v-model="product.barcode" trim />
              </b-form-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <b-form-group
                id="fieldset-7"
                label="Category"
                label-for="product_category"
              >
                <div>
                  <v-select v-model="product.category_id" :items="categories" />
                </div>
              </b-form-group>
            </v-col>
            <v-col>
              <b-form-group
                id="fieldset-8"
                label="In stock"
                label-for="product_stock"
              >
                <v-checkbox v-model="product.instock" label="is product in stock ?" />
              </b-form-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <b-form-group
                id="fieldset-8"
                label="Taxable"
                label-for="product_taxable"
              >
                <v-checkbox v-model="product.taxable" label="is product taxable ?" />
              </b-form-group>
            </v-col>
            <v-col>
              <b-form-group
                id="fieldset-8"
                label="featured"
                label-for="product_eatured"
              >
                <v-checkbox v-model="product.featured" label="is product featured ?" />
              </b-form-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                block
                color="blue"
                dark
                :loading="isLoading"
                x-large
                @click="isLoading = true"
              >
                <v-icon>mdi-circle-edit-outline</v-icon><span class="mx-2">Update</span>
              </v-btn>
            </v-col>
          </v-row>
        </b-form>
      </v-col>
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
      isLoading: false
    }
  },
  computed: {
    formData () {
      return {
        id: this.product.id,
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
  }
}
</script>
