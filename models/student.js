var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require("uuid/v1");


//Student Schema
var studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    roll_no:{
        type: Number,
        maxlength: 32,
        trim: true
    },
    year:{
        type: Number,
        min:1,
        max:4,
        default:1
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    room_no:{
        type: Number,
        required: true,
        trim: true
    },
    address:{
        type: String,
        trim: true
    },
    img:{ data: Buffer,
        contentType: String
    },
   encry_password:{
       type: String,
       required: true
   },
   salt: String,
},{
    timestamps:true
});

//virtual
studentSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })


//password
studentSchema.methods = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }catch(err){
            return "";
        }
    }
}
module.exports = mongoose.model("student", studentSchema)