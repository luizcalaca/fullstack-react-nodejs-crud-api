import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

const app = express()

app.use(cors());
app.use(json())
app.use(
    urlencoded({
        extended: true,
    }),
)

app.use('/user', userRoutes)

mongoose.connect(`mongodb://127.0.0.1:27017/user`)
.then(() => {
    console.log('Connection OK')
    app.listen(3334)
})
.catch((err) => console.log(err))

