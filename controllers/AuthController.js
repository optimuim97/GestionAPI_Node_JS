const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next)=>{
        const myPlaintextPassword = req.body.password
        const saltRounds = 10

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {

                if(err){
                    res.json({
                        err:err
                    })
                }

                let user = new User({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    password: hash
                })
            
                user.save()
                .then(user=>{
                    res.json({
                        message: 'Utilisateur inscrire avec succès',
                        data: user
                    })
                }).catch(error=>{
                    res.json({
                        message: 'Une erreur est survenue'
                    })
                }) 

            });
        });
}

const login = (req, res, next)=>{
    var username =  req.body.username
    var password = req.body.password

    User.findOne({$or: [{email: username}, {phone:username}]})
    .then(user=>{

        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error : err
                    })
                }
                if(result){
                    let token = jwt.sign({name:user.name}, 'verySecretValue',{expiresIn: '1h'})
                    res.json({
                        message:'Connexion réussie',
                        token
                    })
                }else{
                    res.json({
                        message : 'Une erreur est survenue'
                    })
                }
            })
        }else{
            res.json({
                message:'Les identifiants ne correspondent à nos enregistrements'
            })
        }

    })
}

module.exports = {
    register,
    login
}

