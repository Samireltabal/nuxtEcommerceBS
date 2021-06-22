<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>hello</h1>
        <p>
          <pre>
            {{ product }}
          </pre>
        </p>
      </v-col>
    </v-row>
  </v-container>
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
