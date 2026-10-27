
const LocalStorageManager = {
    setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },

    getLocalStorage(key) {
        const data = localStorage.getItem(key)

        if (data === null) {
            return null
        }

        try {
            return JSON.parse(data)
        } catch {
            return data
        }
    },

    removeLocalStorage: function (key){
        const data = localStorage.getItem(key)
        if (data){
            localStorage.removeItem(key)
        }
    },

    clearLocalStorage: function (){
        localStorage.clear();
    }
}

export default LocalStorageManager