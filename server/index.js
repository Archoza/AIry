import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"
import openJourney from "./routes/openJourney.js"
import stableDiffusion from "./routes/stableDiffusion.js";

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit:'50mb' }))
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/open-journey', openJourney)
app.use('/api/v1/stable-diffusion', stableDiffusion)

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!')
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        console.log('Mongo connect success')
    } catch (err) {
        console.log(err)
    }
    app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))}

startServer()