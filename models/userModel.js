const mongoose =require('mongoose') ;


//for create table into db
const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    userId: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type: Boolean},
    role:{type:String,required:true}

}, {
    //for date
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports=User