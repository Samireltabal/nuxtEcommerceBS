<template>
  <v-row>
    <v-col>
      <v-form>
        <v-text-field
          v-if="show"
          v-model="value"
          :label="setting.name"
          :hint="setting.type"
          required
          :append-outer-icon="icon"
          @click:append-outer="updateSet"
        />
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Setting',
  props: {
    setting: {
      required: true,
      type: Object
    },
    icon: {
      type: String,
      default: 'mdi-send'
    },
    isNew: {
      type: Boolean,
      required: true,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      value: this.isNew ? this.setting.value : this.setting.val
    }
  },
  methods: {
    updateSet () {
      const data = {
        name: this.setting.name,
        val: this.value
      }
      this.$axios.post('/settings/create', data).then(() => {
        this.$emit('success', this.$t('successfully updated settings'), 'success')
      }).catch(() => {
        this.$emit('success', this.$t('failed to update'), 'error')
      })
    }
  }
}
</script>
