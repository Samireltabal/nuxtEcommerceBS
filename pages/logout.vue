<template>
  <div>
    <h3>Logging out...</h3>
  </div>
</template>
<script>
export default {
  computed: {
    path () {
      return this.$app.localePath('/')
    }
  },
  mounted () {
    this.$auth.logout().then(() => {
      this.$router.push(this.path)
    })
  }
}
</script>
