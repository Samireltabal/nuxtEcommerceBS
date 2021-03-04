<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item href="#home">
        {{ $t('home') }}
      </b-breadcrumb-item>
      <b-breadcrumb-item v-for="item in product.breadcrump.slice().reverse()" :key="item.slug" :href="item.slug" :active="item.active">
        {{ item.name }}
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h6 v-for="(value , key) in product" :key="key">
      {{ key }} : {{ value }}
    </h6>
  </div>
</template>
<script>
export default {
  layout: 'default',
  async asyncData ({ params, $axios }) {
    const product = await $axios.$get(`products/show/${params.slug}`)
    return { product }
  }
}
</script>
