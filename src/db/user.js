var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true,
        
    },
    user_name : {
        type: String,
        required : true
        
    },
    user_email : {
        type: String,
        required : true,
        unique : true
    } ,
    user_password: {
        type: String,
        required : true
    },
    user_image : {
        type: Object,
        required : true
    },
    total_orders : {
        type: Number,
        required : true
    },
    created_at : {
        type: String,
        required : true
    },
    last_logged_in: {
        type: String ,
        required : true,
    }

});


const User  =  mongoose.model('user', userSchema);

console.log(User,userSchema.obj) ;

module.exports = User ; 