<template>
  <div>
    <h3>Logging out...</h3>
  </div>
</template>
<script>
export default {
  mounted () {
    this.$auth.logout().then(() => {
      this.$router.push('/')
    })
  }
}
</script>
