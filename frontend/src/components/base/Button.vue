<script setup>
defineProps({
  label: String,
  icon: String,
})

const emit = defineEmits(['btnClicked'])
</script>

<template>
  <button @click="emit('btnClicked', $event)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {{ label }}
  </button>
</template>

<style scoped>

</style>