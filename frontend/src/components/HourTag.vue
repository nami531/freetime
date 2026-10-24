<!-- HourTag.vue -->
<script setup>
defineProps({
  id: {type:Number, required : true},
  start: { type: String, required: true },
  end: { type: String, required: true },
  selected: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <button
      type="button"
      :disabled="disabled"
      :aria-pressed="selected"
      class="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
      :class="[
      selected
        ? 'border-purple-600 bg-purple-600 text-white'
        : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50',
      disabled && 'cursor-not-allowed opacity-40 hover:border-gray-300 hover:bg-white',
    ]"
      @click="emit('toggle', id)"
  >
    {{ start }} - {{ end }}
  </button>
</template>