const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema;
    const userSchema = new Schema({
        name : {
            type : String,
            required: true,
            trim : true
        },
        email : {
            type : String,
            require: true,
            unique :true,
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
        },
        tokens : [{
            token : {
                type : String,
                required : true
            }
        }],
          avatar : {
            type : Buffer
          }
        }
      ,{
        timestamps :true
      });

      userSchema.virtual('tasks', {
        ref : 'Task',
        localField : '_id',
        foreignField : 'owner'
      })

      userSchema.methods.getPublicProfile = function (){
        const user = this
        const userObject = user.toObject()

        delete userObject.password
        delete userObject.tokens
        delete userObject.avatar
        return userObject
      }

      userSchema.methods.generateAuthToken = async function(){
        const user = this
        const token = jwt.sign({_id : user._id.toString()}, process.env.JWT_SECRET)

        user.tokens = user.tokens.concat({token})
        await user.save()

        return token
      }
      userSchema.statics.findByCredentials = async (email, password) => {
        const user = await User.findOne({email})

        if(!user){
            throw new Error('Unable to login')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new Error('Password is incorrect')
        }
        return user
      }
    //Hash the plain text password before saving
      userSchema.pre('save', async function (next) {
        const user = this
        
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8)
        }
        next()
      })


      const User = mongoose.model('User', userSchema)
    module.exports = User;