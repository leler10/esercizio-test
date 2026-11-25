const express = require('express')
const dotenv = require ('dotenv')
const path = require ('path')
const {AppDataSource} = require ('./config/typeorm.conf')
const {PopolaDatabase} = require ('./lib/sqlite.conf')


dotenv.config({path:path.join(__dirname,'.env')})

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

AppDataSource.initialize()
    .then(async() => {
        await PopolaDatabase(AppDataSource)

        app.listen(PORT,()=>{
            console.log(`server online sulla porta' ${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Server startup failed:', error)
        process.exitCode = 1
    })