<script setup>

// region Imports
import {reactive, ref, watch} from 'vue'
import {Button, HourTag, NextEvent, TimeRangePicker} from "../../components/index.js";
import {EventTypes} from "../../globals/index.js";
import {CalendarService} from "../../services/index.js";
import { Calendar as VCalendar, DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import {Formatter, MapperVCalendar} from "../../utils/index.js";
import AvailableHours from "../../components/AvailableHours.vue";
// endregion

// region Props
const data = reactive({
  horaDesde : null,
  horaHasta : null,
  horasCustom : false,
  selectedEvent : null,
  selectedDate : null
})
const mostrarFormulario = ref(false);

const eventosCalendario = ref(null);

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

function selectEvent(event) {
  data.selectedEvent = event;
  mostrarFormulario.value = data.selectedEvent !== null && EventTypes.getConfigurableCases().includes(data.selectedEvent);

}

function handleSelectTag(hora){
  if (hora === null) return;
  updateHorasCustom(hora.inicio, hora.fin, false);
}

// endregion

// region Submit
async function saveCita(){
  let responseEvento = await CalendarService.setEvento(data);
  if (eventosCalendario.value !== null && eventosCalendario.value[responseEvento.id]){
    eventosCalendario.value[responseEvento.id] = responseEvento;
    MapperVCalendar.constructAttributesVCalendarFromResponse(eventosCalendario.value);
  }
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


</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto w-full max-w-md md:max-w-3xl lg:max-w-5xl px-4 py-6 md:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">

        <div class="space-y-4">
          <VCalendar class="w-full rounded-2xl shadow-sm" expanded :attributes="attributesVCalendar" @dayclick="onDateClick"></VCalendar>
          <NextEvent nombre="Rigoberta Fernández" numero="34612334216" fecha="2026-10-31"></NextEvent>

        </div>

        <div class="mt-6 lg:mt-0 space-y-4">
          <div v-if="data.selectedDate !== null" class="flex flex-col sm:flex-row gap-3">
            <Button class="w-full sm:flex-1" :label="'Añadir una cita'" @btn-clicked="selectEvent(EventTypes.Cita.value)"></Button>
            <Button class="w-full sm:flex-1" :label="'Añadir descanso'" @btn-clicked="selectEvent(EventTypes.Descanso.value); saveCita()"></Button>
          </div>

          <div v-for="evento in EventTypes.getCases()" :key="evento">
            <div v-if="mostrarFormulario && data.selectedEvent === evento" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
              <form class="space-y-6">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-gray-700">Tipo de Cita</label>
                  <select
                      v-model="data.selectedEvent"
                      class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm md:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option
                        v-for="cita in EventTypes.getCasosCita()"
                        :key="cita.value"
                        :value="cita.value"
                    >
                      Cita {{cita.label}} ({{ Formatter.formatDuration(cita.duration) }})
                    </option>
                  </select>
                </div>

                <AvailableHours :selected-date="data.selectedDate" :selected-event="data.selectedEvent" @select-tag="handleSelectTag"></AvailableHours>

                <div class="border-t border-gray-200 pt-4 flex justify-center">
                  <div class="w-full max-w-xs">
                    <TimeRangePicker @change-start="updateHorasCustom($event, null, true)" @change-end="updateHorasCustom(null, $event, true)"></TimeRangePicker>
                  </div>
                </div>

                <button
                    type="submit"
                    class="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                    @submit="saveCita()"
                >
                  Guardar cita
                </button>
              </form>
            </div>
          </div>

          <div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
