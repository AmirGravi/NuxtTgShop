<template>
  <v-text-field
      :model-value="modelValue"
      @update:modelValue="onInput"

      :label="label"
      :type="type"
      variant="outlined"
      density="comfortable"
      hide-details
      class="login-input"
      :class="{ 'has-error': error }"
      :error="error"
      :placeholder="placeholder"
      :rules="rules"
      clearable
  >

    <template #prepend-inner >

      <span class="fs-16 "  v-if="number98">
      +98
      </span>
      <v-icon v-else  size="20">{{ dynamicIcon }}</v-icon>
      <div class="divider-css"></div>

    </template>
  </v-text-field>

</template>

<script setup>
defineProps({
  modelValue: String,
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  icon: { type: String },
  error: { type: Boolean, default: false },
  rules: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])


const dynamicIcon = ref('mdi-account')
const number98 = ref(false)

const onInput = (val) => {
  emit('update:modelValue', val)
  if (Number(val)) {
    number98.value = true
  } else if (String(val)) {
    number98.value = false
    dynamicIcon.value = 'mdi-email'
  }else if (val === '') {
    dynamicIcon.value = 'mdi-account'

  }
}


</script>

<style >
.login-input .v-field {
  direction: ltr !important;
  font-size: 16px;
  color: #333;
}


.divider-css {
  height: 24px;
  width: 1px;
  background-color: #ccc;
  margin: 0 6px;
}
</style>
