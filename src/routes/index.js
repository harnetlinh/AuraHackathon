import client from './client.js'

const router = (app) => {
    app.use('/v1', client)
}

export default router
