import client from './client.js'

const router = (app) => {
    app.use('/', client)
}

export default router
