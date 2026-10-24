<script setup>
import {reactive, ref, watch} from 'vue'
import {Button, HourTag, TimeRangePicker} from "../components/index.js";
import {EventTypes} from "../globals/index.js";
import {CalendarService} from "../services/index.js";
import { Calendar as VCalendar, DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import {Formatter} from "../utils/index.js";

const data = reactive({
  horaDesde : null,
  horaHasta : null,
  horasCustom : false,
  selectedEvent : null,
  selectedDate : null
})
const mostrarFormulario = ref(false);
const horasDisponibles = ref(null);
const selectedHourTag = ref(null)

// Nada más cargar esta página voy a cargar los dias no disponibles que van a estar traducidos a los atributos del calendario
const attributesVCalendar = ref([
  {
    highlight: {
      color: 'purple',
      fillMode: 'outline',
    },
    dates: new Date(2026, 10, 14),
  }
])

function onDateClick(day) {
  data.selectedDate = day.date
}

function selectEvent(event) {
  data.selectedEvent = event;
  mostrarFormulario.value = data.selectedEvent !== null && EventTypes.getConfigurableCases().includes(data.selectedEvent);

}


// Cuando se muestre el formulario, conseguiremos las horas disponibles en funcion del evento
watch(
    [mostrarFormulario, () => data.selectedEvent, () => data.selectedDate],
    async ([formularioVisible, evento, fecha], _, onCleanup) => {
      let cancelado = false
      onCleanup(() => { cancelado = true })

      if (!fecha || !formularioVisible) {
        horasDisponibles.value = []
        return
      }

      const response = await CalendarService.getHorasDisponibles(fecha, evento)
      if (!cancelado) horasDisponibles.value = response.horasDisponibles
    }
)

function updateHorasCustom(startHour=null, endHour=null, custom=false){
  if (startHour !== null){
    data.horaDesde = startHour;
  }

  if (endHour !== null){
    data.horaHasta = endHour;
  }

  data.horasCustom = custom;
}

async function saveCita(){
  await CalendarService.setEvento(data);
}

</script>

<template>
  <div>
    <VCalendar :attributes="attributesVCalendar" @dayclick="onDateClick"></VCalendar>
  </div>
  <div>
    <div>Próxima Cita 31/10/2026 - Con Rigoberta Fernández</div>
    <div>+34 645128422</div>
  </div>

  <div v-if="data.selectedDate !== null">
    <Button :label="'Añadir una cita'" @btn-clicked="selectEvent(EventTypes.Cita.value)"></Button>
    <Button :label="'Añadir descanso'" @btn-clicked="selectEvent(EventTypes.Descanso.value); saveCita()"></Button>
  </div>
  <div v-for="evento in EventTypes.getCases()" :key="evento">
    <div v-if="mostrarFormulario && data.selectedEvent === evento">
      <form>
        <div>
          <label>Tipo de Cita</label>
          <select v-model="data.selectedEvent">
            <option
                v-for="cita in EventTypes.getCasosCita()"
                :key="cita.value"
                :value="cita.value"
            >
              Cita {{cita.label}} ({{ Formatter.formatDuration(cita.duration) }})
            </option>
          </select>
        </div>
        <div>
          <div v-for="(hora, index) in horasDisponibles" :key="index">
            <HourTag :id='index' :end='hora.fin' :start='hora.inicio' :selected="(selectedHourTag ? selectedHourTag.id : null) === index" @toggle="selectedHourTag = {id : index, inicio : hora.inicio, fin : hora.fin}"></HourTag>
          </div>
        </div>
        <div>
          <TimeRangePicker @change-start="updateHorasCustom($event, null, true)" @change-end="updateHorasCustom(null, $event, true)"></TimeRangePicker>
        </div>
        <button type="submit" @submit="saveCita()">Guardar cita</button>
      </form>
    </div>
  </div>
  <div>

  </div>

</template>
