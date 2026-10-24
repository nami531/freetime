
<script setup>
import {reactive} from "vue";

const props = defineProps({
  label: { type: String, default: '' },
  startLabel: { type: String, default: 'Desde' },
  endLabel: { type: String, default: 'Hasta' },
  minuteIncrement: { type: Number, default: 30 },
  color: { type: String, default: 'purple' },
  disabled: { type: Boolean, default: false },
})
const data = reactive( {
  start : new Date(),
  end : new Date()
})

const emit = defineEmits(['changeStart', 'changeEnd'])
</script>

<template>
  <div
      class="flex flex-col gap-2"
  >
    <legend
        v-if="label"
        class="mb-1 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </legend>

    <div
        class="flex flex-wrap items-start gap-4"
        :class="{ 'opacity-50': disabled }"
    >
      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium uppercase tracking-wide text-gray-500">
          {{ startLabel }}
        </span>

        <VDatePicker
            mode="time"
            :is24hr="true"
            :minute-increment="minuteIncrement"
            :color="color"
            :disabled="disabled"
            hide-time-header
            v-model="data.start"
            @update:model-value="emit('changeStart', $event)"
        />
      </div>

      <span class="hidden self-center pt-5 text-gray-400 sm:block">
        -
      </span>

      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium uppercase tracking-wide text-gray-500">
          {{ endLabel }}
        </span>

        <VDatePicker
            mode="time"
            :is24hr="true"
            :minute-increment="minuteIncrement"
            :color="color"
            :disabled="disabled"
            hide-time-header
            v-model="data.end"
            @update:model-value="emit('changeEnd', $event)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.vc-container) {
  border: none;
  background: transparent;
}
</style>
