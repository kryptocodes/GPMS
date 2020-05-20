var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require("uuid/v1");

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    roll_no:{
        type: Number,
        trim: true,
        unique: true
    },
    dept:{
        type:String,
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
    role:{
        type:Number,
        default:0
    },
    room_no:{
        type: Number,
        trim: true
    },
    address:{
        type: String,
        maxlength: 256,
        trim: true
    },
    mobile_no:{
        type: Number,
        maxlength:10,
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
userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })


//password
userSchema.methods = {
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
module.exports = mongoose.model("User", userSchema)