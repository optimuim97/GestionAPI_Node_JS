const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const bookFilmSchema = new Schema({
    title : {
        type : String
    },
    author : {
        type : String
    },
    summary : {
        type : String
    },
    image : {
        type : String
    }
})