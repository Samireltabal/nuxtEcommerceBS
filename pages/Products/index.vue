<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item href="#home">
        {{ $t('home') }}
      </b-breadcrumb-item>
      <!-- <b-breadcrumb-item v-for="item in product.breadcrump.slice().reverse()" :key="item.slug" :href="item.slug" :active="item.active">
        {{ item.name }}
      </b-breadcrumb-item> -->
    </b-breadcrumb>
    <h6 v-for="product in products.data" :key="product.id">
      <nuxt-link :to="localePath('/product/' + product.slug)">
        {{ product.name }}
      </nuxt-link>
    </h6>
  </div>
</template>
<script>
export default {
  layout: 'default',
  async asyncData ({ $axios }) {
    const products = await $axios.$get('products')
    return { products }
  }
}
</script>
