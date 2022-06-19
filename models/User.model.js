import { mongoose } from 'mongoose';
import role from '../configs/role.js';

const userSchema = new mongoose.Schema({
    phone :{
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
        enum: Object.values(role),
        default: role.buyer
    },
    bio: {
        type: String,
        default: 'Chào mừng đến trang cá nhân trên Đồ Chơi Xe của tôi!'
    },
    receipt: [{
        receipt_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Receipt'
        }
    }],
    createAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User',userSchema);