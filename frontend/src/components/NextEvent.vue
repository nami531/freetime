<script setup>
import {Formatter} from "../utils/index.js";

defineProps({
  numero : String,
  nombre : String,
  fecha : String,
})
</script>

<template>
  <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-stretch gap-3 text-left">
    <div class="shrink-0 flex w-12 flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-indigo-100">
      <span class="border-b border-gray-200 bg-gray-50 py-0.5 text-center text-[9px] font-semibold uppercase tracking-wider text-indigo-600"> {{Formatter.getMonthName(fecha, true)}}</span>

      <span class="flex flex-1 items-center justify-center text-lg font-bold leading-none text-indigo-900">{{ Formatter.getDay(fecha) }}</span>
    </div>

    <div class="min-w-0 flex-1">
      <div class="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">Próxima cita: {{ Formatter.formatDate(fecha) }}</div>
      <div class="truncate text-sm md:text-base font-semibold text-gray-900">{{ nombre }}</div>
      <a :href="`https://wa.me/${numero}`" target="_blank" class="text-xs text-gray-500">{{Formatter.formatTlf(numero)}}</a>
    </div>
  </div>
</template>

<style scoped>

</style>