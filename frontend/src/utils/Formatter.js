const Formatter = {
    formatDuration : function (duration){
        return duration < 60 ? duration + "min" : duration / 60 + "h"
    }
}

export default Formatter