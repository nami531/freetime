import { reactive } from 'vue'

const loadingState = reactive({
    activeRequests: 0
})

const LOADING_DELAY = 300
const API_BASE_URL = "http://example.com"

class ApiController {
    static get loadingState() {
        return loadingState
    }

    async request(url, options = {}) {
        let timer
        let loadingStarted = false

        timer = setTimeout(() => {
            loadingState.activeRequests++
            loadingStarted = true
        }, LOADING_DELAY)

        try {
            const response = await fetch(url, options)

            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}`)
            }

            if (response.status === 204) return null

            return await response.json()
        } finally {
            clearTimeout(timer)

            if (loadingStarted) {
                loadingState.activeRequests--
            }
        }
    }

    get(url) {
        return this.request(url)
    }

    post(url, data) {
        return this.request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    }
}

export default ApiController;