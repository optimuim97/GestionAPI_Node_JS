const { response } = require('express')
const Employee = require('../models/Employee')

// Show employees list
const index = (req, res, next)=>{
    Employee.find().
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


//Show single employee
const show = (req,res, next)=>{
    let employeeID = req.body.employeeID
    
    Employee.findById(employeeID)
    .then( response => {
        res.json({
            response
        })
    }
    ).catch(error => {
        res.json({
            message:"Employé non trouvé"
        })
    })
}

const store = (req, res, next) =>{
    let employee = new Employee({
        name : req.body.name,
        designation : req.body.designation,
        email : req.body.email,
        phone : req.body.phone,
        age : req.body.age
    })

    if(req.file){
        employee.avatar = req.file.path
    }

    employee.save()
    .then(response=>{
        res.json({
            message:'Employé ajouté avec succès'
        })
    })
    .catch(error=>{
        res.json({   
            message : 'Une erreur est survenue'
        })
    })

}

// Update Employee informations
const update = (req, res, next)=>{
    let employeeID = req.body.employeeID

    let updateData = {
        name : req.body.name,
        designation : req.body.designation,
        email : req.body.email,
        phone : req.body.phone,
        age : req.body.age,
    }

    Employee.findByIdAndUpdate(employeeID, {$set:updateData}).then((response)=>{
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
    let employeeID = req.body.employeeID

    Employee.findByIdAndRemove(employeeID).then(()=>{
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


