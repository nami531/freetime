const EventTypes = {
    Evento : {
        value : 1
    },
    Descanso : {
        value : 2
    },
    Cita : {
        value : 3,
        label : "normal",
        duration : 180
    },
    CitaRapida : {
        value : 4,
        label : "rápida",
        duration: 60
    },
    CitaUltraRapida : {
        value : 5,
        label : "ultrarrápida",
        duration: 30
    },



    getCases : function (){
        return [EventTypes.Evento.value, EventTypes.Descanso.value, EventTypes.Cita.value, EventTypes.CitaRapida.value, EventTypes.CitaUltraRapida.value]
    },

    getConfigurableCases: function (){
        return [EventTypes.Evento.value, EventTypes.Cita.value, EventTypes.CitaRapida.value,  EventTypes.CitaUltraRapida.value]
    },

    getCasosCita: function (){
        return [EventTypes.Cita, EventTypes.CitaRapida, EventTypes.CitaUltraRapida]
    }

}
export default EventTypes;