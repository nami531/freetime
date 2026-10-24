import {ApiController} from "./index.js";

class CalendarController extends ApiController {
    async getDiasNoDisponibles(mes){
        return await this.get(`/month/${mes}`);
    }

    async getHorasDisponibles(dia, evento){
        return await this.post(`/check-event/`, {
            dia : dia,
            evento : evento
        })
    }
}

export default CalendarController;