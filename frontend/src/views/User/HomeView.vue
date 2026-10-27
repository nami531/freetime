<script setup>

// region Imports
import {reactive, ref, watch} from 'vue'
import {Button, HourTag, NextEvent, TimeRangePicker} from "../../components/index.js";
import {EventTypes} from "../../globals/index.js";
import {CalendarService} from "../../services/index.js";
import { Calendar as VCalendar, DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import {Formatter, LocalStorageManager, MapperVCalendar} from "../../utils/index.js";
import AvailableHours from "../../components/AvailableHours.vue"
import { useRoute } from 'vue-router'

// endregion

// region Props
const route = useRoute()
const data = reactive({
  horaDesde : null,
  horaHasta : null,
  selectedEvent : route.params.idEvent ?? EventTypes.Cita,
  selectedDate : null ,
  name:null,
  tlf:null
})

const attributesVCalendar = ref([
  {
    highlight: {
      color: 'purple',
      fillMode: 'outline',
    },
    dates: new Date(2026, 10, 14),
  }
])
// endregion

// region handleChangeProps
function onDateClick(day) {
  data.selectedDate = day.date
}

function handleSelectTag(hora){
  if (hora === null) return;
  updateHorasCustom(hora.inicio, hora.fin, false);
}

// endregion

// region Submit
async function saveCita(){
  // let responseEvento = await CalendarService.setEvento(data);
  LocalStorageManager.setLocalStorage('fecha-next-cita', data.selectedDate)
  // window.reload()
}
// endregion

// region Auxiliar Methods
function updateHorasCustom(startHour=null, endHour=null, custom=false){
  if (startHour !== null){
    data.horaDesde = startHour;
  }

  if (endHour !== null){
    data.horaHasta = endHour;
  }

  data.horasCustom = custom;
}
// endregion

const fechaNextEvent = getFechaNextEvent();
const nombreAdmin = import.meta.env.VITE_ADMIN_NAME;
const tlfAdmin = import.meta.env.VITE_ADMIN_TLF;

function getFechaNextEvent(){
  const data = LocalStorageManager.getLocalStorage('fecha-next-cita');
  if (data === null) {
    return null
  };
  return Formatter.formatDate(data);
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto w-full max-w-md md:max-w-3xl lg:max-w-5xl px-4 py-6 md:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">

        <div class="space-y-4">
          <VCalendar class="w-full rounded-2xl shadow-sm" expanded :attributes="attributesVCalendar" @dayclick="onDateClick"></VCalendar>
          <div v-if="fechaNextEvent !== null">
            <NextEvent  :nombre="nombreAdmin" :numero="tlfAdmin" :fecha="fechaNextEvent"></NextEvent>
          </div>
        </div>

        <div class="mt-6 lg:mt-0 space-y-4">
          <div v-if="data.selectedDate !== null" class=" w-full flex flex-col sm:flex-row gap-3">
            <form @submit.prevent="saveCita" class="w-full space-y-5 text-left">
              <AvailableHours :selected-date="data.selectedDate" :selected-event="data.selectedEvent" @select-tag="handleSelectTag"></AvailableHours>

              <div class="border-t border-gray-200 pt-5 space-y-4">
                <div class="flex flex-col gap-1.5">
                  <label for="cita-name" class="text-sm font-medium text-gray-700">Nombre</label>
                  <input
                      id="cita-name"
                      type="text"
                      v-model="data.name"
                      placeholder="Tu nombre y apellidos"
                      autocomplete="name"
                      class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm md:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                </div>

                <div class="flex flex-col gap-1.5">
                  <label for="cita-tlf" class="text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                      id="cita-tlf"
                      type="tel"
                      v-model="data.tlf"
                      placeholder="600 000 000"
                      autocomplete="tel"
                      class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm md:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                </div>
              </div>

              <button
                  type="submit"
                  class="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Pedir cita
              </button>
            </form>
          </div>


          <div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
