import express, { json, urlencoded } from 'express'
import { connect } from 'mongoose'

const app = express()
require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

import personRoutes from './routes/personRoutes'


app.use(json())
app.use(
    urlencoded({
        extended: true,
    }),
)

app.use('/person', personRoutes)

connect(`mongodb://127.0.0.1:27017/user`
)
.then(() => {
    console.log('Conectado com sucesso')
    app.listen(3000)
})
.catch((err) => console.log(err))

