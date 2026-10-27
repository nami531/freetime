const Formatter = {
    formatDuration : function (duration){
        return duration < 60 ? duration + "min" : duration / 60 + "h"
    },
    formatTlf : function (tlf){
        return "+" + tlf;
    },

    ensureFecha : function (fecha) {
        if (!(fecha instanceof Date)) {
            fecha = new Date(fecha);
        }
        return fecha;
    },

    formatDate: function (fecha) {
        fecha = Formatter.ensureFecha(fecha);

        const dia = Formatter.getDay(fecha)
        const mes = Formatter.getMonth(fecha);
        const anio = Formatter.getYear(fecha);

        return `${dia}/${mes}/${anio}`;
    },

    formatDateTime: function (fecha) {
        fecha = Formatter.ensureFecha(fecha);

        const dia = Formatter.getDay(fecha)
        const mes = Formatter.getMonth(fecha);
        const anio = Formatter.getYear(fecha);

        return `${dia}/${mes}/${anio}`;
    },

    getDay : function (fecha){
        fecha = Formatter.ensureFecha(fecha);
        return String(fecha.getDate()).padStart(2, '0');
    },

    getMonth : function (fecha){
        fecha = Formatter.ensureFecha(fecha);
        return String(fecha.getMonth() + 1).padStart(2, '0')
    },

    getMonthName : function (fecha, abreviado=false){
        fecha = Formatter.ensureFecha(fecha)
        return fecha.toLocaleDateString('es-ES', {
            month: abreviado ? "short" : "long"
        });
    },

    getYear: function (fecha) {
        fecha = Formatter.ensureFecha(fecha);
        return fecha.getFullYear()
    }
}

export default Formatter