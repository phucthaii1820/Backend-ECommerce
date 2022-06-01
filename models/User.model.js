import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true
    },
    email:{
        type:String,
        default:""
    },
    fullname:{
        type:String,
        default: ""
    },
    gender:{
        type: String,
        default: ""
    },
    address:{
        type:String,
        default: ""
    },
    cmnd:{
        type:String,
        default: ""
    },
    dob:Date,
    role:{
        type:Number,
        default: 1
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User',userSchema);