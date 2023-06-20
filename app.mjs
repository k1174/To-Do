import express from 'express';
import bodyParser from "body-parser";
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import mongoose from 'mongoose';

//importing our own function
import date from './date.mjs'
import { error } from 'console';

const __dirname = dirname(fileURLToPath(import.meta.url))


const app = express()
app.set("view engine", "ejs")//ejs setup

app.use(bodyParser.urlencoded({ extended: true }))


//server my public folder having css as static
app.use(express.static('public'))


//connect mongoose
mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true })//use.. was for depricating warning %% todolistDB is name of db

//schema --- how data to be stored
const itemSchema = {
    listItem: String
}

// model
const Item = mongoose.model("Item", itemSchema);

//adding items
const item1 = new Item({
    listItem: "Welcome to your TodoList"
})
const item2 = new Item({
    listItem: "click '+' to add items"
})
const item3 = new Item({
    listItem: "<---- click to remove items"
})

//default array
const defaultItems = [item1, item2, item3]

//getting request from root route
app.get('/', (req, res) => {

    Item.find({})
        .then((foundItems) => {
            if (foundItems.length === 0) {
                Item.insertMany(defaultItems)
                    .then(() => {
                        console.log("Successfully added default items to DB")
                        res.redirect('/')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                res.render("list", { list: "today", newItem: foundItems })//now, rendering list.ejs passing day, items array    
            }
        })
})


//adding data
app.post('/', (request, respond) => {
    let item = new Item({
        listItem: request.body.listItem
    })


    //adding to array
    // Item.insertMany(item)
    //     .then(() => {
    //         console.log("Successfully added")
    //         console.log(item._id)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         console.log(typeof(item))
    //     })

    item.save()
        .then(() => {
            console.log("Added sucessfully")
        })

    respond.redirect('/')//redirecting to root route so that it updates list
})

// trying to delete items

app.post('/delItem', async (req, res) => {
    const button = req.body

    await Item.deleteOne({ _id: button.itemId })
        .then(() => {
            console.log("Deleted successfully.")
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
})


app.listen(3000, () => {
    console.log(`Server is running on 3000`)
})