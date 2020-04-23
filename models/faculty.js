var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require("uuid/v1");

//faculty schema
var facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },dept:{
        type:String,
        trim:true,
        default:"CSE",
        enum:["CSE","ME","CE","EEE","ECE"]
    },role:{
        type:Number,
        default:0
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
facultySchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })


//password
facultySchema.methods = {
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
module.exports = mongoose.model("faculty", facultySchema)