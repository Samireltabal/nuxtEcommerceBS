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
        <p>
          {{ product }}
        </p>
      </b-col>
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
    return { product }
  },
  data () {
    return {
    }
  }
}
</script>
