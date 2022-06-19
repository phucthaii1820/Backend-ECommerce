import { mongoose } from 'mongoose';
import statusPost from '../configs/statusPost.js';


const productSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    statusPost:{
        type:Number,
        enum: Object.values(statusPost),
        default: statusPost.pending_review
    },
    Image:[Buffer],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require:true
    },
    address:String
},{
    timestamps: true
});

export default mongoose.model('Product',productSchema);