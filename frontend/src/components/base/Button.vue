<script setup>
defineProps({
  label: String,
  icon: String,
})

const emit = defineEmits(['btnClicked'])
</script>

<template>
  <button
      @click="emit('btnClicked', $event)"
      class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm md:text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    {{ label }}
  </button>
</template>

<style scoped>

</style>