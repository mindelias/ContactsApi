import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required: true
    }, 

   email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
   createdAt: {
        type:Date,
       default: Date.now() 
    },
    updatedAt: {
        type:Date ,
        default: Date.now()
    } 


    
     

})

const User = mongoose.model('User', UserSchema)

export default User