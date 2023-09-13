const mongoose = require('mongoose');
const { boolean } = require('yargs');
const validator = require('validator')

const Schema = mongoose.Schema;
    const userSchema = new Schema({
        name : {
            type : String,
            required: true
        },
        email : {
            type : String,
            require: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            }
        },
        age : {
            type : Number,
            default : 0,
            validate(value) {
                if(value < 0){
                    throw new Error('Age must be a positive Number')
                }
            }
        },
        password : {
            type : String,
            require : true,
            minlength : 7,
            validate(value){
                value = value.trim()
                if(value.toLowerCase() == 'password'){
                    throw new Error('Password must not contain string "password"')
                }
            }
        }
      });

    module.exports = userSchema;