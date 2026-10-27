
<script setup>
import { ref, watch } from 'vue'
import HourTag from './HourTag.vue'
import { CalendarService } from '../services/index.js'

const props = defineProps({
  selectedEvent: {
    type: Number,
    required: true
  },
  selectedDate: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['select-tag'])

const horasDisponibles = ref([])
const selectedHourTag = ref(null)

function handleToggle(hora, index) {
  selectedHourTag.value = {
    id: index,
    inicio: hora.inicio,
    fin: hora.fin
  }

  emit('select-tag', selectedHourTag.value)
}

watch(
    [() => props.selectedEvent, () => props.selectedDate],
    async ([evento, fecha], _, onCleanup) => {
      let cancelado = false

      onCleanup(() => {
        cancelado = true
      })

      horasDisponibles.value = []
      selectedHourTag.value = null
      emit('select-tag', null)

      if (!fecha || !evento) return

      const response = await CalendarService.getHorasDisponibles(fecha, evento)

      if (!cancelado) {
        horasDisponibles.value = response.horasDisponibles
      }

    },
    { immediate: true }
)
</script>

<template>
  <div
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-1.5"
  >
    <div
        v-for="(hora, index) in horasDisponibles"
        :key="`${hora.inicio}-${hora.fin}`"
        class="flex"
    >
      <HourTag
          class="w-full text-xs"
          :id="index"
          :end="hora.fin"
          :start="hora.inicio"
          :selected="selectedHourTag?.id === index"
          @toggle="handleToggle(hora, index)"
      />
    </div>
  </div>
</template>
