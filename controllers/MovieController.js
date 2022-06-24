const { response } = require('express')
const Movie = require('../models/Movie')

// Show movies list
const index = (req, res, next)=>{
    Movie.find().
    then(response => {
        res.json({
            response
        })
    }).catch( error => {
        res.json({
            message:'Une erreur est survenue'
        })
    })
}


//Show single movie
const show = (req,res, next)=>{
    let movieID = req.body.movieID
    
    Movie.findById(movieID)
    .then( response => {
        res.json({
            response
        })
    }
    ).catch(error => {
        res.json({
            message:"Films non trouvé"
        })
    })
}

const store = (req, res, next) =>{
    let movie = new Movie({
        title : req.body.title,
        synopsis : req.body.synopsis,
    })

    if(req.file){
        movie.image = req.file.path
    }

    movie.save()
    .then(response=>{
        res.json({
            message:'Films ajouté avec succès'
        })
    })
    .catch(error=>{
        res.json({   
            message : 'Une erreur est survenue'
        })
    })

}

// Update Movie informations
const update = (req, res, next)=>{
    let movieID = req.body.movieID

    let updateData = {
        title : req.body.title,
        synopsis : req.body.synopsis
    }

    Movie.findByIdAndUpdate(movieID, {$set:updateData}).then((response)=>{
        res.json({
            message : 'Mise a jour éffectué',
            data : response
        })
    }).catch(error => {
        res.json({
            message : 'Une erreur est survenue'
        })
    })

}

const destroy = (req,res, next) => {
    let movieID = req.body.movieID

    Movie.findByIdAndRemove(movieID).then(()=>{
        res.json({
            message : 'Suppression éffectué'
        })
    }).catch(error=> {
        res.json({
            message: 'Une erreur est survenue'
        })
    })

}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}


