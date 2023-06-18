import express from 'express';
import bodyParser from "body-parser";
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//importing our own function
import date from './date.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))


const app = express()
app.set("view engine", "ejs")//ejs setup

app.use(bodyParser.urlencoded({ extended: true }))

//server my public folder having css as static
app.use(express.static('public'))

let items = []
let items2 = []

//getting request from root route
app.get('/', (req, res) => {

    let day = date()//getting date 
    res.render("list", { list: day, newItem: items })//now, rendering list.ejs passing day, items array
})


//
app.post('/', (request, respond) => {
    let item = request.body.listItem

    items.push(item)//adding to array
    respond.redirect('/')//redirecting to root route so that it updates list
})


app.listen(3000, () => {
    console.log(`Server is running on 3000`)
})