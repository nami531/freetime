import {CalendarController} from "../controller/index.js";

const controller = new CalendarController();
const CalendarService = {
    getDiasNoDisponiblesMes : async function (mes) {
       return await controller.getDiasNoDisponibles(mes)
    },

    getHorasDisponibles :async function (dia, evento) {
        return {
            "fecha": "2026-10-31",
            "horasDisponibles": [
                {
                    "inicio": "18:00",
                    "fin": "19:00"
                },
                {
                    "inicio": "19:00",
                    "fin": "20:00"
                },
                {
                    "inicio": "20:00",
                    "fin": "21:00"
                },
                {
                    "inicio": "22:00",
                    "fin": "23:00"
                }
            ]
        }
        return await controller.getHorasDisponibles(dia, evento)
    },

    setEvento : async function(data){
        return await controller.post("/eventos/save", data)
    }
}

export default CalendarService