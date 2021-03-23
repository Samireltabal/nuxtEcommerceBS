<template>
  <span>
    <b-nav-item
      v-if="item.type === 'link' && item.shown === 'all'"
      :to="localePath(item.link)"
    >
      {{ $t(item.name) }}
    </b-nav-item>
    <b-nav-item
      v-if="item.type === 'link' && item.shown === 'guest' && !authenticated"
      :to="localePath(item.link)"
    >
      {{ $t(item.name) }}
    </b-nav-item>
    <b-nav-item
      v-if="item.type === 'link' && item.shown === 'loggedin' && authenticated"
      :to="localePath(item.link)"
    >
      {{ $t(item.name) }}
    </b-nav-item>
    <b-nav-item-dropdown
      v-if="item.type === 'dropdown'"
      :text="item.name"
    >
      <b-nav-item
        v-for="child in item.children"
        :key="child.name"
        :to="localePath(child.link)"
        :class=" child.dropdown ? 'd-none' : ''"
      >
        {{ $t(child.name) }}
      </b-nav-item>
    </b-nav-item-dropdown>
  </span>
</template>
<script>
export default {
  name: 'NavItem',
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  computed: {
    authenticated () {
      return this.$auth.loggedIn
    }
  }
}
</script>
